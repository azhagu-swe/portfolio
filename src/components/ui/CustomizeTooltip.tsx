import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CustomizeTooltipProps {
  children: React.ReactNode;
  title: React.ReactNode;
  className?: string;
}

const CustomizeTooltip: React.FC<CustomizeTooltipProps> = ({ children, title, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            "bg-muted text-secondary-foreground border-none shadow-md text-sm",
            "dark:bg-gray-900 dark:text-gray-100",
            className
          )}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomizeTooltip;
