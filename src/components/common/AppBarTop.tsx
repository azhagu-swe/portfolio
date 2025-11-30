import React from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppBarTopProps {
  open: boolean;
  handleDrawerToggle: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const AppBarTop: React.FC<AppBarTopProps> = ({
  open,
  handleDrawerToggle,
  toggleTheme,
  isDarkMode,
}) => {
  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out",
        // Only apply shift on desktop (sm and up)
        "sm:w-full",
        open && "sm:w-[calc(100%-240px)] sm:ml-[240px]"
      )}
    >
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn("mr-2", open && "hidden sm:hidden")}
          onClick={handleDrawerToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold font-orbitron">
            {!open && "Azhagu-swe"}
          </h1>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </div>
    </header>
  );
};

export default AppBarTop;
