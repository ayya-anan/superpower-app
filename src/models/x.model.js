const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const xSchemas = new Map();
const models = require('./x');

models.forEach((m) => {
  // eslint-disable-next-line no-console
  const xSchema = mongoose.Schema(m.model, { timestamps: true });
  // add plugin that converts mongoose to json
  xSchema.plugin(toJSON);
  xSchema.plugin(paginate);
  const x = mongoose.model(m.type[0].toUpperCase() + m.type.slice(1).toLowerCase(), xSchema);
  xSchemas.set(m.type, x);
});

module.exports = xSchemas;
