"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
export default function ThemeTogglebutton({ className = "" }) {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size="icon"
      className={cn("ml-5", className)}
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="dark:block hidden" />
      <Moon className="block dark:hidden" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}