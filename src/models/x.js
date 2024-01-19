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
      customerContact: { type: String, required: true },
      winProbablity: String,
      accountManager: { type: String, required: true },
      startDate: { type: Date, required: true },
      source: String,
      value: { type: Number, required: true },
      closeDate: { type: Date, required: true },
      quotes: [
        {
          date: { type: Date, required: true },
          status: { type: String, required: true },
          subTotal: { type: Number, required: true },
          vat: { type: String, required: true },
          discount: { type: String, required: true },
          total: { type: Number, required: true },
          paymentMilestone: { type: String },
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
];

module.exports = x;
