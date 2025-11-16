const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

// ------------------ ADD INCOME ------------------
router.post("/add", async (req, res) => {
  try {
    const { userEmail, date, amount, source, description, payment } = req.body;

    if (!userEmail || !date || !amount || !source || !description || !payment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const income = new Income({
      userEmail,
      date,
      amount,
      source,
      description,
      payment,
    });

    await income.save();

    res.status(201).json({
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    console.error("❌ Error adding income:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ------------------ GET INCOMES (BY USER) ------------------
router.get("/:userEmail", async (req, res) => {
  try {
    const incomes = await Income.find({
      userEmail: req.params.userEmail,
    }).sort({ date: -1 });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ------------------ UPDATE INCOME ------------------
router.put("/update/:id", async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.json({
      message: "Income updated successfully",
      income: updatedIncome,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ------------------ DELETE INCOME ------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Income.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
