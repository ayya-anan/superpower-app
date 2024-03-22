const Joi = require('joi');
const { objectId } = require('../custom.validation');
const { orgStatusEmuns } = require('../../config/enums');

const postBodySchema = Joi.object({
  informations: Joi.object({
    notes: Joi.string().allow(null).allow(''),
  }),
  primaryDetails: Joi.object({
    orgId: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    certifyingOrg: Joi.boolean(),
    pointofContact: Joi.array().items(
      Joi.object({
        name: Joi.string().trim(),
        email: Joi.string().trim().allow(''),
        phone: Joi.string().trim().allow(''),
        jobTitle: Joi.string().trim().allow(''),
      })
    ),
    accountManager: Joi.string().allow(null).allow(''),
    revenueRange: Joi.string().trim(),
    // website: Joi.string().trim(),
    status: Joi.string()
      .required()
      .valid(...orgStatusEmuns)
      .default('Prospect'),
    invoiceFrequency: Joi.string().allow(null).allow(''),
    startDate: Joi.string().allow(null).allow(''),
    endDate: Joi.string().allow(null).allow(''),
    customerSince: Joi.string().allow(null).allow(''),
  }),
  facilities: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().allow(null).allow(''),
        type: Joi.string().allow(null).allow(''),
        employeeCount: Joi.number().allow(null).allow(''),
        emailAddress: Joi.string().allow(null).allow(''),
        phoneNumber: Joi.string().allow(null).allow(''),
        address: Joi.string().allow(null).allow(''),
        country: Joi.string().allow(null).allow(''),
        zipCode: Joi.string().allow(null).allow(''),
      })
    )
    .allow(''),
  services: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().allow(null).allow(''),
        type: Joi.string().trim().allow(null).allow(''),
        subtype: Joi.string().trim().allow(null).allow(''),
        serviceProvided: Joi.string().trim().allow(null).allow(''),
        amount: Joi.number().allow(null).allow(''),
      })
    )
    .allow(''),
  multiplierValue: Joi.object({
    section: Joi.object().allow(null).allow(''),
    industryType: Joi.object().allow(null).allow(''),
    subType1: Joi.object().allow(null).allow(''),
    subType2: Joi.object().allow(null).allow(''),
    multiplier: Joi.number().allow(null).allow(''),
  }),
});

const createOrganization = {
  body: postBodySchema,
};

const getOrganizations = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrganization = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
  }),
};

const updateOrganization = {
  params: Joi.object().keys({
    organizationId: Joi.required().custom(objectId),
  }),
  body: postBodySchema,
};

const deleteOrganization = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization,
};
