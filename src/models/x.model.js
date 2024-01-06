const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const xSchemas = new Map();

const xSchema = mongoose.Schema({
  personalDetails: {
    type: String,
    required: true,
    trim: true,
  },
});

// add plugin that converts mongoose to json
xSchema.plugin(toJSON);
xSchema.plugin(paginate);

const x = mongoose.model('Test', xSchema);

xSchemas.set('test', x);

module.exports = xSchemas;
