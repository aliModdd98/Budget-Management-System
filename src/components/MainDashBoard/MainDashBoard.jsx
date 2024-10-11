import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Aside from "../Aside/Aside";

const MainDashBoard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflowX: "hidden" }}>
      <Aside />
      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: 0,
          overflowX: "hidden",
        }}
      >
        <NavBar />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
            bgcolor: "background.default",
            paddingTop: "65px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainDashBoard;
