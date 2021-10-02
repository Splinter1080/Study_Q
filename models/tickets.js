const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  timestamp,
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
