import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { lightTheme, darkTheme } from "./theme";
import { ThemeContext } from "./themeContext";

const getStoredTheme = () => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? "dark" : "light";
  }
  return "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getStoredTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MUIThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
