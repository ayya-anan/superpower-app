const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('../plugins');
const { orgStatusEmuns } = require('../../config/enums');

const organizationSchema = mongoose.Schema(
  {
    informations: {
      notes: {
        type: String,
        required: false,
        trim: true,
      },
    },
    primaryDetails: {
      orgId: {
        type: String,
        required: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      certifyingOrg: {
        type: Boolean,
        required: false,
      },
      revenueRange: {
        type: String,
        required: false,
        trim: true,
      },
      pointofContact: {
        type: Array,
        required: false,
      },
      accountManager: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        required: true,
        enum: orgStatusEmuns,
        default: 'active',
      },
      invoiceFrequency: {
        type: String,
        required: false,
      },
      startDate: {
        type: String,
        required: false,
      },
      endDate: {
        type: String,
        required: false,
      },
      customerSince: {
        type: String,
        required: false,
      },
    },
    facilities: [
      {
        type: {
          type: String,
          required: false,
          trim: true,
        },
        employeeCount: {
          type: String,
          required: false,
          trim: true,
        },
        emailAddress: {
          type: String,
          required: false,
          trim: true,
        },
        phoneNumber: {
          type: String,
          required: false,
          trim: true,
        },
        address: {
          type: String,
          required: false,
          trim: true,
        },
        country: {
          type: String,
          required: false,
          trim: true,
        },
        zipCode: {
          type: String,
          required: false,
          trim: true,
        },
      },
    ],
    services: [
      {
        type: {
          type: String,
          required: false,
          trim: true,
        },
        subtype: {
          type: String,
          required: false,
          trim: true,
        },
        serviceProvided: {
          type: String,
          required: false,
          trim: true,
        },
        amount: {
          type: Number,
          required: false,
          trim: true,
        },
      },
    ],
    multiplierValue: {
      section: {
        type: Object,
        required: false,
      },
      industryType: {
        type: Object,
        required: false,
      },
      subType1: {
        type: Object,
        required: false,
      },
      subType2: {
        type: Object,
        required: false,
      },
      multiplier: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
organizationSchema.plugin(toJSON);
organizationSchema.plugin(paginate);

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
