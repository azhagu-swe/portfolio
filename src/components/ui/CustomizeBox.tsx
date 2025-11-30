import React from "react";
import { cn } from "@/lib/utils";

interface CustomizeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CustomizeBox: React.FC<CustomizeBoxProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-card p-5 rounded-xl text-center border-2 border-primary relative overflow-hidden transition-all duration-400 ease-out",
        "hover:border-primary hover:rotate-2 hover:scale-105 hover:shadow-[0px_4px_15px_rgba(var(--primary),0.5),0px_0px_10px_rgba(var(--primary),0.5)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
