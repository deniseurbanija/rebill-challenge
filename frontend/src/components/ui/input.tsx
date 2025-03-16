"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type="text"
          className={cn(
            "w-full h-10 px-4 py-2 rounded-lg border border-[#EBEDEF] bg-white text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={onSearch}
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
