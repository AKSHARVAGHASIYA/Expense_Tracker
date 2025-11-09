const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

// ➕ Add Income
router.post("/add", async (req, res) => {
  try {
    const { userEmail, date, amount, source, description, payment } = req.body;

    if (!userEmail || !date || !amount || !source || !description || !payment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const income = new Income({ userEmail, date, amount, source, description, payment });
    await income.save();

    res.status(201).json({ message: "Income added successfully", income });
  } catch (error) {
    console.error("❌ Error adding income:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📥 Get all incomes for a user
router.get("/:userEmail", async (req, res) => {
  try {
    const incomes = await Income.find({ userEmail: req.params.userEmail }).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✏️ Update Income
router.put("/update/:id", async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!income) return res.status(404).json({ message: "Income not found" });
    res.json({ message: "Income updated successfully", income });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ❌ Delete Income
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    if (!deletedIncome) return res.status(404).json({ message: "Income not found" });
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
