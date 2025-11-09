const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      enum: ["Cash", "Online"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
