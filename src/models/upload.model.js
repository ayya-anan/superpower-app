const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const uploadSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    s3_key: {
      type: String,
      required: true,
    },
    s3_url: {
      type: String,
      required: true,
    },
    entity_type: {
      type: String,
      required: true,
    },
    entity_id: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
uploadSchema.plugin(toJSON);
uploadSchema.plugin(paginate);

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
