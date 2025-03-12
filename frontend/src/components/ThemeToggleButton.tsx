import { useContext } from "react";
import { ThemeContext } from "../theme/themeContext";
import { LightMode, DarkMode } from "@mui/icons-material";

const ThemeToggleButton = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) return null;

  const { theme, toggleTheme } = themeContext;

  return (
    <>
      {theme === "light" ? <DarkMode onClick={toggleTheme} cursor="pointer" sx={{marginLeft: 4}}/> : <LightMode onClick={toggleTheme} cursor="pointer" color="secondary" sx={{marginLeft: 4}}/>}
    </>
  );
};

export default ThemeToggleButton;
