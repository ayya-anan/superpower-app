const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('../plugins');
const { statusEmuns } = require('../../config/enums');

const individualSchema = mongoose.Schema(
  {
    primaryDetails: {
      id: {
        type: String,
        required: false,
        trim: true,
      },
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
        required: false,
        enum: statusEmuns,
        default: 'Prospect',
      },
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
      joiningDate: {
        type: String,
        required: false,
        trim: true,
      },
      workType: {
        type: String,
        required: false,
        trim: true,
      },
      PrefferedWorkingHours: {
        type: Number,
        required: false,
        trim: true,
      },
    },
    addresses: [
      {
        primaryEmail: {
          type: String,
          required: false,
          trim: true,
        },
        alternateEmail: {
          type: String,
          required: false,
          trim: true,
        },
        primaryPhone: {
          type: String,
          required: false,
          trim: true,
        },
        alternatePhone: {
          type: String,
          required: false,
          trim: true,
        },
        address: {
          type: String,
          required: false,
          trim: true,
        },
        zipCode: {
          type: String,
          required: false,
          trim: true,
        },
        country: {
          type: String,
          required: false,
          trim: true,
        },
      },
    ],
    workDetails: {
      employeeNumber: {
        type: Number,
        required: false,
        trim: true,
      },
      initials: {
        type: String,
        required: false,
        trim: true,
      },
      dateOfJoining: {
        type: Date,
        required: false,
      },
      lastWorkingDay: {
        type: Date,
        required: false,
      },
      reportingManager: {
        type: String,
        required: false,
        trim: true,
      },
      workingHours: {
        sunday: {
          type: Number,
          required: false,
        },
        monday: {
          type: Number,
          required: false,
        },
        tuesday: {
          type: Number,
          required: false,
        },
        wednesday: {
          type: Number,
          required: false,
        },
        thursday: {
          type: Number,
          required: false,
        },
        friday: {
          type: Number,
          required: false,
        },
        saturday: {
          type: Number,
          required: false,
        },
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
