import { Pie, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import {
  Chart,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  selectExpenseDistribution,
  selectIncomeExpenses,
  selectIncomeTrends,
  selectSpendingTrends,
} from "../../store/slices/budget/budget.slice";

// Register Chart.js elements
Chart.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const expensesDistribution = useSelector(selectExpenseDistribution);
  const { income, expenses } = useSelector(selectIncomeExpenses);
  const spendingTrends = useSelector(selectSpendingTrends);
  const incomeTrends = useSelector(selectIncomeTrends);

  // Data for charts...
  const expenseDistributionData = {
    labels: expensesDistribution.map((item) => item.category),
    datasets: [
      {
        data: expensesDistribution.map((item) => item.total),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const incomeExpensesData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const spendingTrendsData = {
    labels: spendingTrends.map((item) => item.date),
    datasets: [
      {
        label: "Spending Over Time",
        data: spendingTrends.map((item) => item.amount),
        fill: false,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
      },
    ],
  };

  const incomeTrendsData = {
    labels: incomeTrends.map((item) => item.date),
    datasets: [
      {
        label: "Income Over Time",
        data: incomeTrends.map((item) => item.amount),
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Grid container spacing={4}>
        {/* Card for Expense Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "300px" }}>
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6">
                Expense Distribution by Category
              </Typography>
              <Box sx={{ flex: 1, position: "relative", height: "100%" }}>
                <Pie data={expenseDistributionData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Income vs Expenses */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "300px" }}>
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6">Income vs Expenses</Typography>
              <Box sx={{ flex: 1, position: "relative", height: "100%" }}>
                <Pie data={incomeExpensesData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Spending Trends */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "300px" }}>
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6">Spending Trends Over Time</Typography>
              <Box sx={{ flex: 1, position: "relative", height: "100%" }}>
                <Line data={spendingTrendsData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Income Trends */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "300px" }}>
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6">Income Trends Over Time</Typography>
              <Box sx={{ flex: 1, position: "relative", height: "100%" }}>
                <Line data={incomeTrendsData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts;
