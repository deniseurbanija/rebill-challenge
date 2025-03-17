"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAddresses,
  selectAddress,
  closeAddressSelector,
} from "@/redux/addressSlice";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AddressSelector() {
  const dispatch = useAppDispatch();
  const { addresses, isLoading, error, showAddressSelector, selectedAddress } =
    useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (!showAddressSelector) return null;

  if (isLoading) {
    return (
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="text-red-500 text-sm">Error: {error}</div>
        </div>
      </div>
    );
  }

  const handleSelectAddress = (address: (typeof addresses)[0]) => {
    dispatch(selectAddress(address));
    dispatch(closeAddressSelector());
  };

  return (
    <AnimatePresence>
      {showAddressSelector && (
        <motion.div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-medium text-gray-900">
                  Select a saved address
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {addresses.length}{" "}
                    {addresses.length === 1 ? "address" : "addresses"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => dispatch(closeAddressSelector())}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {addresses.map((address) => {
                  const isSelected =
                    selectedAddress?.placeId === address.placeId;

                  return (
                    <motion.div
                      key={address.street}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelectAddress(address)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      layout
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-sm">
                          {address.street}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {address.city}, {address.state} {address.zipCode}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {address.country}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
