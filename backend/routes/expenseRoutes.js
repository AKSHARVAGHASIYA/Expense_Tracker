const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// 🧩 Add Expense
router.post("/add", async (req, res) => {
  try {
    const { userEmail, date, amount, category, description, payment } = req.body;

    if (!userEmail || !date || !amount || !category || !description || !payment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = new Expense({ userEmail, date, amount, category, description, payment });
    await expense.save();

    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.error("❌ Error adding expense:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🧩 Get All Expenses (for logged-in user)
router.get("/:userEmail", async (req, res) => {
  try {
    const expenses = await Expense.find({ userEmail: req.params.userEmail }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 🧩 Update Expense
router.put("/update/:id", async (req, res) => {
  try {
    const { date, amount, category, description, payment } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { date, amount, category, description, payment },
      { new: true }
    );

    if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });

    res.json({ message: "Expense updated successfully", expense: updatedExpense });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 🧩 Delete Expense
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📄 backend/routes/expenseRoutes.js
// const express = require("express");
// const router = express.Router();
// const Expense = require("../models/Expense");

// Get all expenses for a user
router.get("/:userEmail", async (req, res) => {
  try {
    const expenses = await Expense.find({ userEmail: req.params.userEmail }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

module.exports = router;


module.exports = router;
