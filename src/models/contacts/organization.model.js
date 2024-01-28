const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('../plugins');
const { socialMediaTypeEmuns, orgStatusEmuns } = require('../../config/enums');

const organizationSchema = mongoose.Schema(
  {
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
      revenueRange: {
        type: String,
        required: false,
        trim: true,
      },
      pointofContact: {
        type: Array,
        required: false,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Individual',
      },
      accountManager: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Individual',
        type: String,
        required: false,
      },
      status: {
        type: String,
        required: true,
        enum: orgStatusEmuns,
        default: 'active',
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
        amount: {
          type: Number,
          required: false,
          trim: true,
        },
        companyAverage: {
          type: Number,
          required: false,
          trim: true,
        },
      },
    ],
    // addresses: [
    //   {
    //     type: {
    //       type: String,
    //       required: false,
    //       enum: addressTypeEmuns,
    //       trim: true,
    //     },
    //     address: {
    //       type: String,
    //       required: true,
    //       trim: true,
    //     },
    //     country: {
    //       type: String,
    //       required: true,
    //       trim: true,
    //     },
    //     zipCode: {
    //       type: String,
    //       required: true,
    //       trim: true,
    //     },
    //     // website: {
    //     //   type: String,
    //     //   required: false,
    //     //   trim: true,
    //     // },
    //   },
    // ],
    // phones: [
    //   {
    //     type: {
    //       type: String,
    //       required: true,
    //       trim: true,
    //       enum: phoneTypeEmuns,
    //       lowercase: true,
    //     },
    //     phoneNumber: {
    //       type: String,
    //       required: true,
    //       trim: true,
    //       unique: true,
    //     },
    //   },
    // ],
    // emailAddresses: [
    //   {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     lowercase: true,
    //     validate(value) {
    //       if (!validator.isEmail(value)) {
    //         throw new Error('Invalid email');
    //       }
    //     },
    //   },
    // ],
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
          required: false,
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
