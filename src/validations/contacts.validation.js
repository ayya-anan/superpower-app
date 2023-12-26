const Joi = require('joi');

const getContacts = {
  query: Joi.object().keys({}),
};

module.exports = {
  getContacts,
};
