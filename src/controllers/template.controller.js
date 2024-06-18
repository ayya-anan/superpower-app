// const fs = require('fs');
const httpStatus = require('http-status');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

// eslint-disable-next-line import/no-extraneous-dependencies
const sgMail = require('@sendgrid/mail');

const config = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
const s3 = new S3Client(config);

const catchAsync = require('../utils/catchAsync');
// , upload.single('file'),
const createInvoice = catchAsync(async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const uploadedFiles = req.files.map((file) => ({
    key: file.key,
    location: file.location,
    originalname: file.originalname,
  }));
  // Download files from S3 to prepare for email attachments
  const attachments = await Promise.all(
    uploadedFiles.map(async (file) => {
      const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: file.key,
      });
      const data = await s3.send(getObjectCommand);
      const chunks = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const chunk of data.Body) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      return {
        content: buffer.toString('base64'),
        filename: file.originalname,
        type: 'application/octet-stream',
        disposition: 'attachment',
      };
    })
  );
  const msg = {
    to: ['jerinjose.j@gmail.com', 'k.karthikeyan@raisusa.com', 'subhavenkat@raisusa.com'], // Change to your recipient
    from: 'Expert people Management <k.karthikeyan@raisusa.com>', // Change to your verified sender ${req.user.email}
    templateId: 'd-dc1b9185e6ef43fcaa6614de4a1cc1cc',
    attachments,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(httpStatus.CREATED).send('Email sent successfully');
    })
    .catch(() => {});
});

module.exports = {
  createInvoice,
};
