"use client";

import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { AddressSelector } from "./address-selector";

interface NavigationBarProps {
  expanded?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export function NavigationBar({
  expanded = true,
  onToggle,
  onClose,
}: NavigationBarProps) {
  return (
    <div className="bg-white rounded-full flex items-center justify-between px-4 py-2 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500 fill-amber-500" />
          <span className="font-medium">Test mode</span>
        </div>

        <Button
          variant="ghost"
          className="flex items-center gap-1 px-1 hover:bg-transparent hover:text-blue-600"
          onClick={onToggle}
        >
          Addresses
          {expanded ? (
            <div>
              <ChevronUp className="h-4 w-4 text-gray-500" />
            </div>
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-1 px-1 hover:bg-transparent hover:text-blue-600"
          asChild
        >
          <Link href="https://docs.rebill.com/">
            <FileText className="h-4 w-4 text-gray-500" />
            Docs
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700 hover:bg-transparent p-0 h-auto"
          asChild
        >
          <Link href="">
            Complete my account registration
            <ExternalLink className="h-4 w-4 ml-1" />
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
