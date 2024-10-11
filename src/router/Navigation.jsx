import { Routes, Route, Navigate } from "react-router-dom";

import MainDashBoard from "../components/MainDashBoard/MainDashBoard";
import Dashboard from "../pages/Overview";
import TransactionList from "../pages/Transaction";
import Reports from "../pages/Reports";
import Login from "../pages/Login";

const Navigation = () => {
  <Route path="*" element={<Navigate to="/" />} />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="Login" element={<Login />} />
      <Route exact path="/dashboard" element={<MainDashBoard />}>
        <Route exact path="home" element={<Dashboard />} />
        <Route exact path="overView" element={<TransactionList />} />
        <Route exact path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
