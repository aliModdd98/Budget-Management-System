import { useState } from "react";
import { Grid, Tabs, Tab, Box } from "@mui/material";
import Charts from "../components/Charts/Charts";
import ToExcel from "./ToExcel";

const Reports = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box style={{ width: "100%", paddingTop: "25px" }}>
      {" "}
      <Grid container spacing={2} sx={{ marginTop: "40px", padding: "1rem" }}>
        <Grid item xs={12}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="transparent" // Remove the default indicator line
            variant="fullWidth"
          >
            <Tab
              label="Charts"
              sx={{
                borderRadius: "10px",
                backgroundColor: activeTab === 0 ? "#ff6500" : "transparent",
                color: activeTab === 0 ? "#ffffff" : "#ff6500",
                "&.Mui-selected": {
                  backgroundColor: "#ff6500",
                  color: "#ffffff",
                },
                "&:hover": {
                  backgroundColor: "#ff6500",
                  color: "#ffffff",
                },
              }}
            />
            <Tab
              label="Export to Excel"
              sx={{
                borderRadius: "10px",
                backgroundColor: activeTab === 1 ? "#ff6500" : "transparent",
                color: activeTab === 1 ? "#ffffff" : "#ff6500",
                "&.Mui-selected": {
                  backgroundColor: "#ff6500",
                  color: "#ffffff",
                },
                "&:hover": {
                  backgroundColor: "#ff6500",
                  color: "#ffffff",
                },
              }}
            />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <Box hidden={activeTab !== 0}>
            <Charts />
          </Box>
          <Box hidden={activeTab !== 1}>
            <ToExcel />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
