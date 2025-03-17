"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleAddressSelector } from "@/redux/addressSlice";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationBar } from "./navigation-bar";

export function TestModeButton() {
  const dispatch = useAppDispatch();
  const { showAddressSelector } = useAppSelector((state) => state.address);

  return (
    <AnimatePresence>
      {!showAddressSelector ? (
        <motion.div
          layout
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-50 rounded-full flex items-center gap-2 px-4 py-2 h-auto shadow-md"
            onClick={() => dispatch(toggleAddressSelector())}
          >
            <AlertCircle className="h-5 w-5 text-white fill-amber-500" />
            <span className="font-medium text-xs">Test mode</span>
            <motion.span
              className="ml-2"
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
        <NavigationBar />
      )}
    </AnimatePresence>
  );
}
