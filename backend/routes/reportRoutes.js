const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const Income = require("../models/Income");

// POST filter report
router.post("/filter", async (req, res) => {
  try {
    const { email, startDate, endDate, category } = req.body;

    if (!email) {
      return res.status(400).json({ message: "User email missing" });
    }

    let expenseQuery = { userEmail: email };
    let incomeQuery = { userEmail: email };

    if (startDate && endDate) {
      expenseQuery.date = { $gte: startDate, $lte: endDate };
      incomeQuery.date = { $gte: startDate, $lte: endDate };
    }

    if (category) {
      expenseQuery.category = category;
    }

    const expenses = await Expense.find(expenseQuery);
    const incomes = await Income.find(incomeQuery);

    // Summary
    const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);

    // Monthly data
    let monthMap = {};
    expenses.forEach((e) => {
      const month = new Date(e.date).toLocaleString("default", {
        month: "short",
      });
      monthMap[month] = (monthMap[month] || 0) + e.amount;
    });

    const monthlyData = Object.keys(monthMap).map((m) => ({
      month: m,
      total: monthMap[m],
    }));

    // Category Data
    let categoryMap = {};
    expenses.forEach((e) => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });

    const categoryData = Object.keys(categoryMap).map((c) => ({
      name: c,
      value: categoryMap[c],
    }));

    // Table data
    const tableData = expenses.map((e) => ({
      month: new Date(e.date).toLocaleString("default", { month: "short" }),
      category: e.category,
      amount: e.amount,
    }));

    res.json({
      totalIncome,
      totalExpenses,
      monthlyData,
      categoryData,
      tableData,
    });
  } catch (err) {
    console.log("❌ Report error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
