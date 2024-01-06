const Joi = require('joi');

const getXs = {
  query: Joi.object().keys({}),
};

module.exports = {
  getXs,
};
