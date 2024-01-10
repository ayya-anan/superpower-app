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
];

module.exports = x;
