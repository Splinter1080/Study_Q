const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  userId: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderId:{
    type: String,
  },
  email:{
      type:String
  }

});

module.exports = mongoose.model("Ticket", TicketSchema);
