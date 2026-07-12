"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center transition-colors duration-200"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5 text-yellow-600" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 text-yellow-600 dark:hidden" />
      <Moon className="w-5 h-5 text-blue-300 hidden dark:block" />
    </button>
  );
};

export default ThemeToggle;
