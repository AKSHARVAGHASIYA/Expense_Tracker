const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// ------------------ ADD EXPENSE ------------------
router.post("/add", async (req, res) => {
  try {
    const { userEmail, date, amount, category, description, payment } = req.body;

    if (!userEmail || !date || !amount || !category || !description || !payment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = new Expense({
      userEmail,
      date,
      amount,
      category,
      description,
      payment,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    console.error("❌ Error adding expense:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ------------------ GET EXPENSES (BY USER) ------------------
router.get("/:userEmail", async (req, res) => {
  try {
    const expenses = await Expense.find({
      userEmail: req.params.userEmail,
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ------------------ UPDATE EXPENSE ------------------
router.put("/update/:id", async (req, res) => {
  try {
    const { date, amount, category, description, payment } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { date, amount, category, description, payment },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ------------------ DELETE EXPENSE ------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
