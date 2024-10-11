import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  selectTotalIncome,
  selectTotalExpenses,
  selectCurrentBalance,
  selectRecentTransactions,
  selectTopCategories,
} from "../store/slices/budget/budget.slice";
import { PaddingTwoTone } from "@mui/icons-material";

const Dashboard = () => {
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpenses = useSelector(selectTotalExpenses);
  const currentBalance = useSelector(selectCurrentBalance);
  const recentTransactions = useSelector(selectRecentTransactions);
  const topCategories = useSelector(selectTopCategories);

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

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
      <Grid container spacing={3} sx={{ padding: "1rem" }}>
        {/* Financial Overview */}

        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "orange",
              textAlign: "center",
              mb: 2,
              mt: 2,
            }}
          >
            Your Financial Snapshot
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "orange" }}
                >
                  Financial Overview
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Total Income</TableCell>
                        <TableCell>Total Expenses</TableCell>
                        <TableCell>Current Balance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>${totalIncome}</TableCell>
                        <TableCell>${totalExpenses}</TableCell>
                        <TableCell>${currentBalance}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "orange" }}
                >
                  Recent Transactions
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentTransactions.length ? (
                        recentTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>${transaction.amount}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3}>
                            <Typography>No recent transactions</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Top Categories */}
        <Grid item xs={12}>
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "orange" }}
                >
                  Top Expense Categories
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topCategories.length ? (
                        topCategories.map(({ category, total }) => (
                          <TableRow key={category}>
                            <TableCell>{category}</TableCell>
                            <TableCell>${total}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Typography>No top categories available</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
