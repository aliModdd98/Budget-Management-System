import { createContext, useState, useContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeStore = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#ff6500",
      },
      secondary: {
        main: "#808080",
      },
      background: {
        default: isDarkMode ? "#333333" : "#ffffff",
        paper: isDarkMode ? "#424242" : "#ffffff",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#333333",
        secondary: isDarkMode ? "#bbbbbb" : "#666666",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? "#333333" : "#f5f5f5",
            color: isDarkMode ? "#ffffff" : "#333333",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? "#333333" : "#f5f5f5",
            color: isDarkMode ? "#ffffff" : "#333333",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#ff6500",
              color: "#ffffff",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: isDarkMode ? "#ffffff" : "#333333",
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
