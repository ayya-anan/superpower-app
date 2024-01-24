const Joi = require('joi');
const { objectId } = require('../custom.validation');
const { socialMediaTypeEmuns, orgStatusEmuns } = require('../../config/enums');

const postBodySchema = Joi.object({
  primaryDetails: Joi.object({
    name: Joi.string().required().trim(),
    pointofContact: Joi.array().items(
      Joi.object({
        firstName: Joi.string().trim(),
        lastName: Joi.string().trim(),
        email: Joi.string().trim(),
        phone: Joi.string().trim(),
        jobTitle: Joi.string().trim(),
      })
    ),
    accountManager: Joi.string().trim(),
    section: Joi.string().allow(''),
    industryType: Joi.string().allow(''),
    subType1: Joi.string().allow(''),
    subType2: Joi.string().allow(''),
    revenueRange: Joi.string().required().trim(),
    // website: Joi.string().trim(),
    status: Joi.string()
      .required()
      .valid(...orgStatusEmuns)
      .default('Prospect'),
  }),
  // segmant: Joi.object({
  //   notes: Joi.string().trim(),
  // }).required(),
  facilities: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().allow(''),
        employeeCount: Joi.number().allow(''),
        emailAddress: Joi.string().allow(''),
        phoneNumber: Joi.string().allow(''),
        address: Joi.string().allow(''),
        country: Joi.string().allow(''),
        zipCode: Joi.string().allow(''),
      })
    )
    .allow(''),
  services: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required().trim(),
        amount: Joi.number().required(),
        companyAverage: Joi.number().required(),
        // tinoAverage: Joi.number().required(),
      })
    )
    .required(),
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
