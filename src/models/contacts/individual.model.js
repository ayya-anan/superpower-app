const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('../plugins');
const { statusEmuns, addressTypeEmuns, phoneTypeEmuns, socialMediaTypeEmuns } = require('../../config/enums');

const individualSchema = mongoose.Schema(
  {
    personalDetails: {
      salutation: {
        type: String,
        required: false,
        trim: true,
      },
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      middleName: {
        type: String,
        required: false,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        required: true,
        enum: statusEmuns,
        default: 'active',
      },
    },
    addresses: [
      {
        type: {
          type: String,
          required: false,
          enum: addressTypeEmuns,
          trim: true,
        },
        streetNumber: {
          type: String,
          required: true,
          trim: true,
        },
        streetName: {
          type: String,
          required: true,
          trim: true,
        },
        // city: {
        //   type: String,
        //   required: true,
        //   trim: true,
        // },
        // state: {
        //   type: String,
        //   required: true,
        //   trim: true,
        // },
        // county: {
        //   type: String,
        //   required: true,
        //   trim: true,
        // },
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
          required: true,
          trim: true,
          enum: socialMediaTypeEmuns,
          lowercase: true,
        },
        url: {
          type: String,
          required: true,
          trim: true,
          unique: true,
        },
      },
    ],
    professionalDetails: {
      jobTitle: {
        type: String,
        required: false,
        trim: true,
      },
      companyName: {
        type: String,
        required: false,
        trim: true,
      },
      roleName: {
        type: String,
        required: false,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
individualSchema.plugin(toJSON);
individualSchema.plugin(paginate);

const Individual = mongoose.model('Individual', individualSchema);

module.exports = Individual;
