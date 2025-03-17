"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAddresses, selectAddress } from "@/redux/addressSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Check, MapPin } from "lucide-react";

export function AddressSelector() {
  const dispatch = useAppDispatch();
  const { addresses, isLoading, error, showAddressSelector, selectedAddress } =
    useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (!showAddressSelector) return null;

  // Renderizar un mensaje de carga o error si es necesario
  if (isLoading)
    return <div className="loading-indicator">Cargando direcciones...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  const handleSelectAddress = (address: (typeof addresses)[0]) => {
    dispatch(selectAddress(address));
  };

  return (
    <AnimatePresence>
      {showAddressSelector && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xl"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="bg-white rounded-3xl shadow-md overflow-hidden max-w-xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Select a saved address
                </h2>
                <span className="text-sm text-gray-500">
                  {addresses.length} results
                </span>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {addresses.map((address) => {
                  const isSelected =
                    selectedAddress?.placeId === address.placeId;

                  return (
                    <motion.div
                      key={address.placeId}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelectAddress(address)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      layout
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {address.extraInfo === "home" ? (
                            <Home className="h-4 w-4 text-blue-500" />
                          ) : address.extraInfo === "work" ? (
                            <Briefcase className="h-4 w-4 text-green-500" />
                          ) : (
                            <MapPin className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="text-sm text-gray-500 capitalize">
                            {address.extraInfo || "Address"}
                          </span>
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-blue-500 text-white p-1 rounded-full"
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                        )}
                      </div>
                      <div className="font-medium mt-1">{address.street}</div>
                      <div className="text-gray-500">
                        {address.city}, {address.country}
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
