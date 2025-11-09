const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true, // link expenses to logged-in user
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
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

module.exports = mongoose.model("Expense", expenseSchema);
