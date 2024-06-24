const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { uploadService } = require('../services');

const createUpload = catchAsync(async (req, res) => {
  try {
    const files = req.files.map((file) => ({
      filename: file.originalname,
      s3_key: file.key,
      entity_type: req.body.entity_type,
      s3_url: file.location,
      size: file.size,
      entity_id: req.body.entity_id,
      mimetype: file.mimetype,
    }));

    const upload = await uploadService.createUpload(files);
    res.status(httpStatus.CREATED).send(upload);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

const getUploads = catchAsync(async (req, res) => {
  const { id, type } = req.params;
  const result = await uploadService.getUploads(type, id);
  res.send(result);
});

const deleteUpload = catchAsync(async (req, res) => {
  await uploadService.deleteUploadById(req.params.uploadId);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  createUpload,
  getUploads,
  deleteUpload,
};
