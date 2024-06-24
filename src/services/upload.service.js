const httpStatus = require('http-status');
const { Upload } = require('../models');
const ApiError = require('../utils/ApiError');

const createUpload = async (userBody) => {
  return Upload.create(userBody);
};

const getUploads = async (type, id) => {
  return Upload.find({ entity_type: type, entity_id: id });
};

const getUploadById = async (id) => {
  return Upload.findById(id);
};

const deleteUploadById = async (UploadId) => {
  const upload = await getUploadById(UploadId);
  if (!upload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Upload not found');
  }
  await upload.remove();
  return upload;
};

module.exports = {
  getUploads,
  createUpload,
  deleteUploadById,
  getUploadById,
};
