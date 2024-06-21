const Joi = require('joi');
const { objectId } = require('../custom.validation');
const { statusEmuns } = require('../../config/enums');

const postBodySchema = Joi.object({
  primaryDetails: Joi.object({
    id: Joi.string(),
    salutation: Joi.string(),
    firstName: Joi.string().required(),
    middleName: Joi.string().allow(null).allow(''),
    lastName: Joi.string().required(),
    status: Joi.object()
      .valid(...statusEmuns)
      .default('Prospect'),
    jobTitle: Joi.string().allow(null).allow(''),
    companyName: Joi.string().allow(null).allow(''),
    roleName: Joi.string().allow(null).allow(''),
    joiningDate: Joi.string().allow(null).allow(''),
    workType: Joi.string().allow(null).allow(''),
    PrefferedWorkingHours: Joi.number().allow(null).allow(),
  }).allow(''),
  addresses: Joi.array()
    .items(
      Joi.object({
        primaryEmail: Joi.string().allow(null).allow(''),
        alternateEmail: Joi.string().allow(null).allow(''),
        primaryPhone: Joi.string().allow(null).allow(''),
        alternatePhone: Joi.string().allow(null).allow(''),
        address: Joi.string().allow(null).allow(''),
        country: Joi.string().allow(null).allow(''),
        zipCode: Joi.string().allow(null).allow(''),
      })
    )
    .allow(''),
  workDetails: Joi.object({
    employeeNumber: Joi.number().allow(null).allow(),
    initials: Joi.string().allow(null).allow(''),
    dateOfJoining: Joi.date().allow(null).allow(''),
    lastWorkingDay: Joi.date().allow(null).allow(''),
    reportingManager: Joi.string().allow(null).allow(''),
    workingHours: Joi.object({
      sunday: Joi.number().allow(null).allow(),
      monday: Joi.number().allow(null).allow(),
      tuesday: Joi.number().allow(null).allow(),
      wednesday: Joi.number().allow(null).allow(),
      thursday: Joi.number().allow(null).allow(),
      friday: Joi.number().allow(null).allow(),
      saturday: Joi.number().allow(null).allow(),
    }),
  }).allow(''),
});

const createIndividual = {
  body: postBodySchema,
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
  body: postBodySchema,
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
