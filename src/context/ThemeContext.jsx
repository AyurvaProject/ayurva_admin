import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#1976d2",
                },
                secondary: {
                  main: "#f50057",
                },
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#000000", // Primary text color (Black)
                  secondary: "#555555", // Secondary text color (Dark Gray)
                },
              }
            : {
                primary: {
                  main: "#000", // Purple for dark mode
                },
                secondary: {
                  main: "#03dac6", // Cyan for dark mode
                },
                background: {
                  default: "#fff",
                  paper: "#fff",
                },
                text: {
                  primary: "#000", // White text for better contrast
                  secondary: "#b0b0b0", // Light gray text
                  layoutPrimary: "#fff",
                  layoutSecondary: "#b0b0b0",
                },
              }),
        },
        typography: {
          fontFamily: "Arial, sans-serif",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
