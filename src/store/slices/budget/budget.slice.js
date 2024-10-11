import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const initialState = {
  currentBalance: 0,
  transactions: [],
  income: 0,
  expenses: 0,
  balance: 0,
  totalBudget: 0,
  filter: { type: "", category: "" },
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addTransaction(state, action) {
      const { type, amount } = action.payload;
      state.transactions.push(action.payload);

      // Adjust the current balance based on transaction type
      if (type === "income") {
        state.currentBalance += amount;
      } else if (type === "expense") {
        state.currentBalance -= amount;
      }

      // Update income and expenses if needed
      updateBudgetState(state);
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      updateBudgetState(state);
    },
    editTransaction(state, action) {
      const updatedTransaction = action.payload;
      const transactionIndex = state.transactions.findIndex(
        (tx) => tx.id === updatedTransaction.id
      );
      const oldTransaction = state.transactions[transactionIndex];

      // Update current balance by removing old transaction's effect
      if (oldTransaction.type === "income") {
        state.currentBalance -= oldTransaction.amount;
      } else if (oldTransaction.type === "expense") {
        state.currentBalance += oldTransaction.amount;
      }

      // Replace the old transaction with the updated one
      state.transactions[transactionIndex] = updatedTransaction;

      // Update current balance with the new transaction value
      if (updatedTransaction.type === "income") {
        state.currentBalance += updatedTransaction.amount;
      } else if (updatedTransaction.type === "expense") {
        state.currentBalance -= updatedTransaction.amount;
      }

      // Call updateBudgetState to recalculate income and expenses
      updateBudgetState(state);
    },
    setTotalBudget(state, action) {
      state.totalBudget = action.payload;
      state.currentBalance = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    exportExcel: (state, action) => {
      const { startDate, endDate, transactionType } = action.payload;
      exportTransactionsToExcel(
        state.transactions,
        startDate,
        endDate,
        transactionType
      );
    },
  },
});

const updateBudgetState = (state) => {
  state.income = state.transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
  state.expenses = state.transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate balance based on total budget, income, and expenses
  state.balance = state.totalBudget + state.income - state.expenses;
};

// Selectors
export const selectTotalIncome = (state) => state.budget.income;
export const selectTotalExpenses = (state) => state.budget.expenses;
export const selectCurrentBalance = (state) => state.budget.balance;
export const selectTotalBudget = (state) => state.budget.totalBudget;
export const selectTransactions = (state) => state.budget.transactions;
export const selectFilter = (state) => state.budget.filter;

export const selectFilteredTransactions = (state) => {
  const { type, category } = state.budget.filter;
  return state.budget.transactions.filter(
    (transaction) =>
      (type ? transaction.type === type : true) &&
      (category ? transaction.category === category : true)
  );
};

// Memoized selector for recent transactions
export const selectRecentTransactions = createSelector(
  (state) => state.budget.transactions,
  (transactions) => transactions.slice(-5)
);

// Selector for top categories
export const selectTopCategories = (state) => {
  const categoryExpenses = {};

  state.budget.transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      if (!categoryExpenses[transaction.category]) {
        categoryExpenses[transaction.category] = 0;
      }
      categoryExpenses[transaction.category] += transaction.amount;
    }
  });

  const sortedCategories = Object.entries(categoryExpenses)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3); // Top 3 categories

  return sortedCategories.map(([category, total]) => ({ category, total }));
};

// Selector for expense distribution by category
export const selectExpenseDistribution = (state) => {
  const categoryExpenses = {};

  state.budget.transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      if (!categoryExpenses[transaction.category]) {
        categoryExpenses[transaction.category] = 0;
      }
      categoryExpenses[transaction.category] += transaction.amount;
    }
  });

  return Object.entries(categoryExpenses).map(([category, total]) => ({
    category,
    total,
  }));
};

// Selector for expenses vs. income
export const selectIncomeExpenses = (state) => ({
  income: state.budget.income,
  expenses: state.budget.expenses,
});

// Selector for spending trends
export const selectSpendingTrends = (state) => {
  const trends = {};

  state.budget.transactions.forEach((transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (transaction.type === "expense") {
      if (!trends[date]) {
        trends[date] = 0;
      }
      trends[date] += transaction.amount;
    }
  });

  return Object.entries(trends).map(([date, amount]) => ({ date, amount }));
};

// Selector for income trends
export const selectIncomeTrends = (state) => {
  const trends = {};

  state.budget.transactions.forEach((transaction) => {
    const date = new Date(transaction.date).toLocaleDateString(); // Format as needed
    if (transaction.type === "income") {
      if (!trends[date]) {
        trends[date] = 0;
      }
      trends[date] += transaction.amount;
    }
  });

  return Object.entries(trends).map(([date, amount]) => ({ date, amount }));
};

// Excel Export Function
const exportTransactionsToExcel = (
  transactions,
  startDate,
  endDate,
  transactionType
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Transactions Report");

  // Define columns
  worksheet.columns = [
    { header: "Date", key: "date", width: 15 },
    { header: "Description", key: "description", width: 25 },
    { header: "Category", key: "category", width: 20 },
    { header: "Type", key: "type", width: 10 },
    { header: "Amount", key: "amount", width: 15 },
  ];

  // Filter transactions by date range
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const isDateInRange =
      transactionDate >= new Date(startDate) &&
      transactionDate <= new Date(endDate);

    const isTypeMatched =
      transactionType === "all" || transaction.type === transactionType;

    return isDateInRange && isTypeMatched;
  });

  // Add rows to the worksheet
  filteredTransactions.forEach((transaction) => {
    worksheet.addRow({
      date: transaction.date,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      amount: transaction.amount,
    });
  });

  // Generate Excel file and trigger download
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Transactions_Report_${startDate}_to_${endDate}.xlsx`);
  });
};

export const {
  addTransaction,
  deleteTransaction,
  editTransaction,
  setTotalBudget,
  setFilter,
  exportExcel,
} = budgetSlice.actions;

export default budgetSlice.reducer;
