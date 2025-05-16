"use client";
import { useTheme } from "next-themes";
import ModeToggleUI from "./ModeToggleUI";

const ModeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return <ModeToggleUI theme={theme as string} toggleTheme={toggleTheme} />;
};

export default ModeToggleButton;
