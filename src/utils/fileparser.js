const formidable = require('formidable');
const { Upload } = require('@aws-sdk/lib-storage');
const { S3Client } = require('@aws-sdk/client-s3');
const { Transform } = require('stream');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

const parsefile = async (req) => {
  return new Promise((resolve, reject) => {
    const options = {
      maxFileSize: 100 * 1024 * 1024, // 100 megabytes converted to bytes,
      allowEmptyFiles: false,
    };

    const form = formidable(options);
    // method accepts the request and a callback.
    form.parse(req, () => {
      // console.log(fields, "====", files)
    });

    form.on('error', (error) => {
      reject(error.message);
    });

    form.on('data', (data) => {
      if (data.name === 'complete') {
        // let statuscode = data.value['$metadata']?.httpStatusCode || 200;
        resolve(data.value);
      }
    });

    form.on('fileBegin', (formName, file) => {
      // eslint-disable-next-line no-param-reassign
      file.open = async function () {
        this._writeStream = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk);
          },
        });

        this._writeStream.on('error', (e) => {
          form.emit('error', e);
        });

        // upload to S3
        new Upload({
          client: new S3Client({
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            region,
          }),
          params: {
            ACL: 'public-read',
            Bucket,
            Key: `${Date.now().toString()}-${this.originalFilename}`,
            Body: this._writeStream,
          },
          tags: [], // optional tags
          queueSize: 4, // optional concurrency configuration
          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // optional manually handle dropped parts
        })
          .done()
          .then((data) => {
            form.emit('data', { name: 'complete', value: data });
          })
          .catch((err) => {
            form.emit('error', err);
          });
      };

      // eslint-disable-next-line no-param-reassign
      file.end = function (cb) {
        this._writeStream.on('finish', () => {
          this.emit('end');
          cb();
        });
        this._writeStream.end();
      };
    });
  });
};

module.exports = parsefile;
