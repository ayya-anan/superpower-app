const Joi = require('joi');
const { objectId } = require('../custom.validation');
const { addressTypeEmuns, phoneTypeEmuns, socialMediaTypeEmuns, orgStatusEmuns } = require('../../config/enums');

const postBodySchema = Joi.object({
  primaryDetails: Joi.object({
    name: Joi.string().required().trim(),
    pointofContact: Joi.string().trim(),
    accountManager: Joi.string().trim(),
    website: Joi.string().trim(),
    status: Joi.string()
      .required()
      .valid(...orgStatusEmuns)
      .default('active'),
  }).required(),
  segmant: Joi.object({
    industryType: Joi.string().required().trim(),
    subType: Joi.string().required().trim(),
    revenueRange: Joi.string().required().trim(),
    notes: Joi.string().trim(),
  }).required(),
  facilities: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required().trim(),
        address: Joi.string().required().trim(),
        country: Joi.string().required().trim(),
        zipCode: Joi.string().required().trim(),
      })
    )
    .required(),
  services: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required().trim(),
        amount: Joi.number().required(),
        companyAverage: Joi.number().required(),
        tinoAverage: Joi.number().required(),
      })
    )
    .required(),
  addresses: Joi.array().items(
    Joi.object({
      type: Joi.string()
        .valid(...addressTypeEmuns)
        .trim(),
      address: Joi.string().required().trim(),
      country: Joi.string().required().trim(),
      zipCode: Joi.string().required().trim(),
    })
  ),
  phones: Joi.array().items(
    Joi.object({
      type: Joi.string()
        .required()
        .valid(...phoneTypeEmuns)
        .trim()
        .lowercase(),
      phoneNumber: Joi.string().required().trim(),
    })
  ),
  emailAddresses: Joi.array().items(Joi.string().required().trim().lowercase().email()),
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
