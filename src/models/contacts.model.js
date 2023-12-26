const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const contactsSchema = mongoose.Schema({
  personalDetails: {
    salutation: {
      type: String,
      required: true,
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
      trim: true,
      lowercase: true,
    },
  },
  addresses: [
    {
      type: {
        type: String,
        required: true,
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
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      county: {
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
        lowercase: true,
      },
      phoneNumber: {
        type: String,
        required: true,
        trim: true,
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
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  ],

  openOpportunities: [
    {
      accountManager: {
        type: String,
        required: true,
        trim: true,
      },
      source: {
        type: String,
        required: true,
        trim: true,
      },
      opportunities: [
        {
          type: String,
          required: true,
          trim: true,
        },
      ],
      deals: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  activityLogs: [
    {
      lastContact: {
        type: String,
        required: true,
        trim: true,
      },
      modeOfContact: {
        type: String,
        required: true,
        trim: true,
      },
      keyNotes: [
        {
          type: String,
          required: true,
          trim: true,
        },
      ],
    },
  ],
});

// add plugin that converts mongoose to json
contactsSchema.plugin(toJSON);
contactsSchema.plugin(paginate);

const Contact = mongoose.model('Contact', contactsSchema);

module.exports = Contact;
