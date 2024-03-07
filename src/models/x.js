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
    type: 'deal',
    model: {
      dealName: { type: String, required: true },
      org: { type: String, required: true },
      status: { type: String, required: true },
      customerContact: { type: String },
      winProbablity: String,
      accountManager: { type: String },
      startDate: { type: Date, required: true },
      source: String,
      type: { type: String },
      value: { type: Number, required: true },
      closeDate: { type: Date, required: true },
      quotes: [
        {
          date: { type: Date, required: true },
          status: { type: String, required: true },
          type: { type: String },
          paymentType: { type: String },
          subTotal: { type: Number, required: true },
          vat: { type: Number, required: true },
          discount: { type: String, required: true },
          total: { type: Number, required: true },
          paymentMilestone: { type: Number },
          services: [
            {
              facility: { type: String, required: true },
              service: { type: String, required: true },
              unitRate: { type: Number, required: true },
              quantity: { type: Number, required: true },
              employeeCount: { type: Number, required: true },
              total: { type: Number, required: true },
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
      address: { type: String, required: true },
      totalAllocatedHours: { type: Number, required: true },
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
