import { useState } from "react";
import { useDispatch } from "react-redux";
import { exportExcel } from "../store/slices/budget/budget.slice";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const ToExcel = () => {
  const dispatch = useDispatch();

  // State for form inputs
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactionType, setTransactionType] = useState("all");

  // State for validation message
  const [error, setError] = useState("");

  const handleExport = () => {
    // Validation checks
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    // Check if start date is after end date
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be greater than end date.");
      return;
    }

    if (transactionType === "all") {
      // If "all" is selected, you can choose to do something or show a message
      setError("Please select a specific transaction type.");
      return;
    }

    // If validation passes, dispatch the export action
    dispatch(exportExcel({ startDate, endDate, transactionType }));

    // Optionally clear the error after successful export
    setError("");
  };

  // Function to handle Snackbar close
  const handleSnackbarClose = () => {
    setError("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Row for Start Date, End Date, and Transaction Type */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          padding: "1rem",
        }}
      >
        {error && (
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        )}
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="transaction-type-label">Type</InputLabel>
          <Select
            labelId="transaction-type-label"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            label="Type"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Row for Export Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button variant="contained" onClick={handleExport}>
          Export to Excel
        </Button>
      </Box>

      {/* Snackbar for error messages */}
    </Box>
  );
};

export default ToExcel;
