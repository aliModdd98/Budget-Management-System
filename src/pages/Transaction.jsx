import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Alert,
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  selectFilteredTransactions,
  setFilter,
  setTotalBudget,
} from "../store/slices/budget/budget.slice";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectFilteredTransactions);
  const currentBalance = useSelector((state) => state.budget.currentBalance);
  const totalBudget = useSelector((state) => state.budget.totalBudget);
  const [newTransaction, setNewTransaction] = useState({
    type: "income",
    amount: 0,
    category: "",
    date: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [filter, setLocalFilter] = useState({ type: "", category: "" });
  const [sortOption, setSortOption] = useState({ field: "date", order: "asc" });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    console.log("Current Balance:", currentBalance);
  }, [currentBalance]);

  useEffect(() => {
    console.log("Total Budget:", totalBudget); // Log total budget
  }, [totalBudget]);
  const [totalBudgetInput, setTotalBudgetInput] = useState(0);

  // const totalBudget = useSelector(selectTotalBudget);

  const handleSetTotalBudget = () => {
    // Ensure to set total budget and balance correctly
    dispatch(setTotalBudget(Number(totalBudgetInput)));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (newTransaction.amount <= 0) {
      errors.amount = "Amount must be greater than 0.";
      isValid = false;
    }
    if (!newTransaction.category) {
      errors.category = "Category is required.";
      isValid = false;
    }
    if (!newTransaction.date) {
      errors.date = "Date is required.";
      isValid = false;
    }
    if (!newTransaction.description) {
      errors.description = "Description is required.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleAddOrUpdateTransaction = () => {
    if (!validateForm()) return;

    console.log("Adding/Editing Transaction:", newTransaction);
    console.log("Current Balance Before Transaction:", currentBalance);

    if (
      newTransaction.type === "expense" &&
      newTransaction.amount > currentBalance
    ) {
      setError("Error: Expense exceeds current balance!");
      return;
    }

    setError("");

    const transactionToSave = {
      ...newTransaction,
      id: isEditing ? currentTransactionId : Date.now(), // ensure id is set correctly
    };

    if (isEditing) {
      dispatch(editTransaction(transactionToSave)); // Pass the entire transaction object
    } else {
      dispatch(addTransaction(transactionToSave));
    }

    // Resetting transaction form after handling
    setNewTransaction({
      type: "income",
      amount: 0,
      category: "",
      date: "",
      description: "",
    });
    setIsEditing(false); // Reset editing state
    setCurrentTransactionId(null); // Reset current transaction ID
  };

  const handleEditTransaction = (transaction) => {
    setNewTransaction(transaction);
    setIsEditing(true);
    setCurrentTransactionId(transaction.id);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = { ...filter, [name]: value };

    setLocalFilter(updatedFilter);
    dispatch(setFilter(updatedFilter)); // Update Redux filter state
  };

  const handleSortChange = (field) => {
    const isAsc = sortOption.field === field && sortOption.order === "asc";
    setSortOption({ field, order: isAsc ? "desc" : "asc" });
  };

  // Apply filter and sort
  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      return (
        (filter.type === "" || transaction.type === filter.type) &&
        (filter.category === "" || transaction.category === filter.category)
      );
    })
    .sort((a, b) => {
      if (sortOption.field === "date") {
        return sortOption.order === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (sortOption.field === "amount") {
        return sortOption.order === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      if (sortOption.field === "category") {
        return sortOption.order === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        marginRight: "2rem",
        display: "flex",
        boxSizing: "border-box",
      }}
    >
      {" "}
      <Grid
        container
        spacing={2}
        sx={{ margin: "2rem", height: "100%", width: "100%", padding: "1rem" }}
      >
        {/* Total Budget */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                sx={{ color: "#ff6500", fontWeight: "bold" }}
              >
                Set Total Budget
              </Typography>

              <TextField
                label="Total Budget"
                type="number"
                value={totalBudgetInput || ""}
                onChange={(e) => setTotalBudgetInput(Number(e.target.value))}
                fullWidth
                sx={{ mb: 2, mt: 2 }}
              />

              {/* Button to set balance */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSetTotalBudget}
              >
                Set Balance
              </Button>

              {/* Display the current total budget */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Current Balance: ${currentBalance}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Filter Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                sx={{ color: "#ff6500", fontWeight: "bold" }}
              >
                Filter Transactions
              </Typography>
              <TextField
                select
                label="Type"
                name="type"
                value={filter.type}
                onChange={handleFilterChange}
                fullWidth
                sx={{ mb: 2, mt: 2 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </TextField>

              <TextField
                select
                label="Category"
                name="category"
                value={filter.category}
                onChange={handleFilterChange}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Healthcare">Healthcare</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        {/* Transaction Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                sx={{ color: "#ff6500", fontWeight: "bold" }}
              >
                Transactions
              </Typography>
              <TableContainer component={Paper}>
                {" "}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortOption.field === "date"}
                          direction={sortOption.order}
                          onClick={() => handleSortChange("date")}
                        >
                          Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortOption.field === "description"}
                          direction={sortOption.order}
                          onClick={() => handleSortChange("description")}
                        >
                          Description
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortOption.field === "category"}
                          direction={sortOption.order}
                          onClick={() => handleSortChange("category")}
                        >
                          Category
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortOption.field === "amount"}
                          direction={sortOption.order}
                          onClick={() => handleSortChange("amount")}
                        >
                          Amount
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAndSortedTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>
                          {" "}
                          {transaction.type === "income"
                            ? `+ $${transaction.amount}`
                            : `- $${transaction.amount}`}{" "}
                          $
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEditTransaction(transaction)}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() =>
                              dispatch(deleteTransaction(transaction.id))
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Add or Edit Transaction */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                sx={{ color: "#ff6500", fontWeight: "bold" }}
              >
                {isEditing ? "Edit Transaction" : "Add New Transaction"}
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                select
                label="Type"
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, type: e.target.value })
                }
                fullWidth
                sx={{ mb: 2, mt: 2 }}
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </TextField>

              <TextField
                select
                label="Category"
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                error={!!fieldErrors.category}
                helperText={fieldErrors.category}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Healthcare">Healthcare</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                label="Amount"
                type="number"
                value={newTransaction.amount === 0 ? "" : newTransaction.amount}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  setNewTransaction({
                    ...newTransaction,
                    amount: value,
                  });
                }}
                error={!!fieldErrors.amount}
                helperText={fieldErrors.amount}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                type="date"
                placeholder="Select a date"
                value={newTransaction.date ? newTransaction.date : ""}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                error={!!fieldErrors.date}
                helperText={fieldErrors.date || "Use format: YYYY-MM-DD "}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
                error={!!fieldErrors.description}
                helperText={fieldErrors.description}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddOrUpdateTransaction}
                >
                  {isEditing ? "Update Transaction" : "Add Transaction"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionList;
