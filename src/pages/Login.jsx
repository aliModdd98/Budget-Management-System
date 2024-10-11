import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate email format
    if (!validateEmail(email)) {
      setLoading(false);
      setError("Please enter a valid email address.");
      return;
    }

    // Simple password validation (you can customize this as needed)
    if (password.trim() === "") {
      setLoading(false);
      setError("Please enter your password.");
      return;
    }

    // Simulate a successful login
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard/home");
    }, 1500);
  };

  return (
    <Box
      className="background"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            minWidth: 350,
            maxWidth: 500,
            p: 5,
            boxShadow: 3,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <AccountBalanceWalletIcon
                sx={{ fontSize: 50, color: "#ff6500" }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#ff6500" }}
              textAlign="center"
              mb={2}
            >
              Welcome to Budget Manager
            </Typography>

            {error && (
              <Typography
                color="red"
                sx={{ fontWeight: "bold" }}
                textAlign="center"
                mb={2}
              >
                {error}
              </Typography>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3, bgcolor: "#ff6500" }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
