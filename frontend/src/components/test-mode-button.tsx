"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationBar } from "./navigation-bar";
import type { Dispatch, SetStateAction } from "react";

interface TestModeButtonProps {
  showBar: boolean;
  onShowBarChange: Dispatch<SetStateAction<boolean>>;
}

export function TestModeButton({
  showBar,
  onShowBarChange,
}: TestModeButtonProps) {
  const { addresses } = useAppSelector((state) => state.address);

  // Solo mostrar si hay direcciones guardadas
  if (addresses.length === 0) return null;

  return (
    <AnimatePresence mode="wait">
      {!showBar ? (
        <motion.div
          layout
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-50 rounded-full flex items-center gap-2 px-4 py-2 h-auto shadow-md"
            onClick={() => onShowBarChange(true)}
          >
            <AlertCircle className="h-5 w-5 text-white fill-amber-500" />
            <span className="font-medium text-xs">Test mode</span>
            <motion.span
              className="ml-2"
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33337 5L13.3334 10L8.33337 15"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </Button>
        </motion.div>
      ) : (
        <NavigationBar onClose={() => onShowBarChange(false)} />
      )}
    </AnimatePresence>
  );
}
