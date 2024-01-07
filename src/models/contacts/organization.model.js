const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('../plugins');
const { addressTypeEmuns, phoneTypeEmuns, socialMediaTypeEmuns, orgStatusEmuns } = require('../../config/enums');

const organizationSchema = mongoose.Schema(
  {
    primaryDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      pointofContact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Individual',
      },
      accountManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Individual',
      },
      website: {
        type: String,
        required: false,
        trim: true,
      },
      status: {
        type: String,
        required: true,
        enum: orgStatusEmuns,
        default: 'active',
      },
    },
    segmant: {
      industryType: {
        type: String,
        required: true,
        trim: true,
      },
      subType: {
        type: String,
        required: true,
        trim: true,
      },
      revenueRange: {
        type: String,
        required: true,
        trim: true,
      },
      notes: {
        type: String,
        required: false,
        trim: true,
      },
    },
    facilities: [
      {
        type: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          required: true,
          trim: true,
        },
        zipCode: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    services: [
      {
        type: {
          type: String,
          required: true,
          trim: true,
        },
        amount: {
          type: Number,
          required: true,
          trim: true,
        },
        companyAverage: {
          type: Number,
          required: true,
          trim: true,
        },
        tinoAverage: {
          type: Number,
          required: true,
          trim: true,
        },
      },
    ],
    addresses: [
      {
        type: {
          type: String,
          required: false,
          enum: addressTypeEmuns,
          trim: true,
        },
        address: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          required: true,
          trim: true,
        },
        zipCode: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    phones: [
      {
        type: {
          type: String,
          required: true,
          trim: true,
          enum: phoneTypeEmuns,
          lowercase: true,
        },
        phoneNumber: {
          type: String,
          required: true,
          trim: true,
          unique: true,
        },
      },
    ],
    emailAddresses: [
      {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
    ],
    socialMediaLinks: [
      {
        type: {
          type: String,
          trim: true,
          enum: socialMediaTypeEmuns,
          lowercase: true,
        },
        url: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
organizationSchema.plugin(toJSON);
organizationSchema.plugin(paginate);

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
