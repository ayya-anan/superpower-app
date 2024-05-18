const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const kanbanSchema = mongoose.Schema(
  {
    listId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    cards: {
      type: [], // Assuming cards can hold various types of data, adjust if needed
      default: [],
    },
    nextStatuses: {
      type: [String], // Array of listIds representing the next possible statuses
      required: true,
    },
    winProbability: {
      type: Number,
      default: 0, // Set default to null if winProbability is not provided
    },
    addNew: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
kanbanSchema.plugin(toJSON);
kanbanSchema.plugin(paginate);

const Kanban = mongoose.model('Kanban', kanbanSchema);

module.exports = Kanban;
