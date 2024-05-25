// const { object } = require('joi');

const x = [
  {
    type: 'test',
    model: {
      personalDetails: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  {
    type: 'milestoneInvoice',
    model: {
      milestoneNumber: {
        type: Number,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      condition: {
        type: String,
        required: true,
      },
      paymentPercentage: {
        type: Number,
        required: true,
      },
      milestoneAmount: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  },
  {
    type: 'taskAllocation',
    model: {
      allocatedHours: { type: Object, required: true },
      allocationPercentage: { type: Number, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      orgId: { type: String, required: true },
      name: { type: String, required: true },
      project: { type: String, required: true },
      remainingHours: { type: Object, required: true },
      submittedHours: { type: Object, required: true },
      taskId: { type: String, required: true },
      taskName: { type: String, required: true },
      address: { type: String, required: false },
      totalAllocatedHours: { type: Number, required: true },
    },
  },
  {
    type: 'serviceList',
    model: {
      rootType: { type: String, required: true },
      type: { type: String, required: true },
      subtype: { type: String, required: true },
      serviceProvided: { type: String, required: true },
      measure: { type: String, required: true },
      rate: { type: String, required: true },
      validTill: { type: Date, required: true },
      template: { type: String, required: false },
    },
  },
  {
    type: 'WZCode',
    model: {
      data: [],
    },
  },
];

module.exports = x;
