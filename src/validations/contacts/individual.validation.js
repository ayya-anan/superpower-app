const Joi = require('joi');
const { objectId } = require('../custom.validation');
const { statusEmuns, addressTypeEmuns, phoneTypeEmuns, socialMediaTypeEmuns } = require('../../config/enums');

const postBodySchema = {
  personalDetails: Joi.object().keys({
    salutation: Joi.string(),
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    status: Joi.string()
      .required()
      .valid(...statusEmuns),
  }),
  addresses: Joi.array()
    .items(
      Joi.object().keys({
        type: Joi.string()
          .required()
          .valid(...addressTypeEmuns),
        streetNumber: Joi.string().required(),
        streetName: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        county: Joi.string().required(),
        zipCode: Joi.string().required(),
      })
    )
    .required(),
  phones: Joi.array()
    .items(
      Joi.object().keys({
        type: Joi.string()
          .required()
          .valid(...phoneTypeEmuns),
        phoneNumber: Joi.string().required(),
      })
    )
    .required(),
  emailAddresses: Joi.array().items(Joi.string().required().email()).required(),
  socialMediaLinks: Joi.array().items(
    Joi.object().keys({
      type: Joi.string()
        .required()
        .valid(...socialMediaTypeEmuns),
      url: Joi.string().required().uri(),
    })
  ),
};

const createIndividual = {
  body: Joi.object().keys(postBodySchema),
};

const getIndividuals = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getIndividual = {
  params: Joi.object().keys({
    individualId: Joi.string().custom(objectId),
  }),
};

const updateIndividual = {
  params: Joi.object().keys({
    individualId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(postBodySchema).min(1),
};

const deleteIndividual = {
  params: Joi.object().keys({
    individualId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createIndividual,
  getIndividuals,
  getIndividual,
  updateIndividual,
  deleteIndividual,
};
