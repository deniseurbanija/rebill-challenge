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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleAddressSelector } from "@/redux/addressSlice";
import { motion } from "framer-motion";

interface NavigationBarProps {
  onClose: () => void;
}

export function NavigationBar({ onClose }: NavigationBarProps) {
  const dispatch = useAppDispatch();
  const { showAddressSelector } = useAppSelector((state) => state.address);

  return (
    <motion.div
      initial={{ width: "auto", scale: 0.9 }}
      animate={{ width: "100%", scale: 1 }}
      exit={{ width: "auto", scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 px-2 sm:px-4"
    >
      <motion.div
        className="bg-white/95 backdrop-blur-sm rounded-full flex flex-col sm:flex-row items-center justify-between shadow-md border border-gray-100 min-h-[44px] w-full sm:w-2/3 lg:w-2xl mx-auto py-2 sm:py-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-white fill-amber-500" />
            <span className="font-medium text-xs">Test mode</span>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
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

        <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 w-full sm:w-auto justify-center lg:justify-between mt-2 sm:mt-0">
          <Button
            variant="ghost"
            className="flex items-center text-xs gap-1 px-1 hover:bg-transparent hover:text-blue-600"
            onClick={() => dispatch(toggleAddressSelector())}
          >
            <span className="font-medium">Saved addresses</span>
            <motion.span
              animate={{ rotate: showAddressSelector ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {showAddressSelector ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </motion.span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center text-xs gap-1 px-1 hover:bg-transparent hover:text-blue-600"
            asChild
          >
            <Link href="https://docs.rebill.com/">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="hidden sm:inline">Docs</span>
            </Link>
          </Button>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4">
          <Button
            variant="ghost"
            className="text-blue-600 text-xs hover:text-blue-700 hover:bg-transparent p-0 h-auto"
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
      </motion.div>
    </motion.div>
  );
}
