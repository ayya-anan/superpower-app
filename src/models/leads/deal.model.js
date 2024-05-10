const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const dealSchema = mongoose.Schema(
  {
    dealName: { type: String, required: true },
    org: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    status: { type: String, required: true },
    customerContact: { type: String },
    winProbablity: String,
    accountManager: { type: mongoose.Schema.Types.ObjectId, ref: 'Individual', required: true },
    startDate: { type: Date, required: true },
    source: String,
    type: { type: String },
    subType: { type: String },
    value: { type: Number, required: true },
    facility: { type: String, required: true },
    closeDate: { type: Date, required: true },
    quotes: [
      {
        date: { type: Date, required: true },
        status: { type: String, required: true },
        type: { type: String },
        paymentType: { type: String },
        header: { type: String },
        footer: { type: String },
        subTotal: { type: Number, required: true },
        vat: { type: Number, required: true },
        discount: { type: String, required: true },
        total: { type: Number, required: true },
        paymentMilestone: { type: Number },
        services: [
          {
            dealType: { type: String, required: true },
            facility: { type: String },
            type: { type: String },
            service: { type: Object, required: true },
            unitRate: { type: Number, required: true },
            quantity: { type: Number },
            description: { type: String },
            employeeCount: { type: Number },
            total: { type: Number, required: true },
            startDate: { type: Date },
            endDate: { type: Date },
            includeInTotal: { type: Boolean },
          },
        ],
        payments: [
          {
            date: { type: Date, required: true },
            criteria: { type: String, required: true },
            percentage: { type: String, required: true },
            amount: { type: String, required: true },
            status: { type: String, required: true },
          },
        ],
      },
    ],
    leadDetails: {
      name: { type: String },
      number: { type: String },
      email: { type: String },
      leadMode: { type: String },
      followUpdate: { type: Date },
      ballParkEst: { type: Number },
      description: { type: String },
      note: { type: String },
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
dealSchema.plugin(toJSON);
dealSchema.plugin(paginate);

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
