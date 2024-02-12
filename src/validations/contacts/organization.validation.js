const Joi = require('joi');
const { objectId } = require('../custom.validation');
const { socialMediaTypeEmuns, orgStatusEmuns } = require('../../config/enums');

const postBodySchema = Joi.object({
  primaryDetails: Joi.object({
    orgId: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    pointofContact: Joi.array().items(
      Joi.object({
        name: Joi.string().trim(),
        email: Joi.string().trim().allow(''),
        phone: Joi.string().trim().allow(''),
        jobTitle: Joi.string().trim().allow(''),
      })
    ),
    accountManager: Joi.string().allow(null).allow(''),
    section: Joi.object().allow(''),
    industryType: Joi.object().allow(''),
    subType1: Joi.object().allow(''),
    subType2: Joi.object().allow(''),
    revenueRange: Joi.string().trim(),
    // website: Joi.string().trim(),
    status: Joi.string()
      .required()
      .valid(...orgStatusEmuns)
      .default('Prospect'),
    invoiceFrequency: Joi.string().allow(null).allow(''),
    startDate: Joi.object().allow(''),
    endDate: Joi.object().allow(''),
    customerSince: Joi.object().allow(''),
  }),
  // segmant: Joi.object({
  //   notes: Joi.string().trim(),
  // }).required(),
  facilities: Joi.array()
    .items(
      Joi.object({
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
        type: Joi.string().trim().allow(null).allow(''),
        amount: Joi.number().allow(null).allow(''),
        companyAverage: Joi.number().allow(null).allow(''),
        tinoAverage: Joi.number().allow(null).allow(''),
      })
    )
    .allow(''),
  // addresses: Joi.array().items(
  //   Joi.object({
  //     type: Joi.string()
  //       .valid(...addressTypeEmuns)
  //       .trim(),
  //     address: Joi.string().required().trim(),
  //     country: Joi.string().required().trim(),
  //     zipCode: Joi.string().required().trim(),
  //     // website: Joi.string().trim()
  //   })
  // ),
  // phones: Joi.array().items(
  //   Joi.object({
  //     type: Joi.string()
  //       .required()
  //       .valid(...phoneTypeEmuns)
  //       .trim()
  //       .lowercase(),
  //     phoneNumber: Joi.string().required().trim(),
  //   })
  // ),
  // emailAddresses: Joi.array().items(Joi.string().required().trim().lowercase().email()),
  socialMediaLinks: Joi.array().items(
    Joi.object({
      type: Joi.string()
        .required()
        .valid(...socialMediaTypeEmuns)
        .trim()
        .lowercase(),
      url: Joi.string().required().trim(),
    })
  ),
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
