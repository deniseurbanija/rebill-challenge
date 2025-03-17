"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAddresses, selectAddress } from "@/redux/addressSlice";

export function AddressSelector() {
  const dispatch = useAppDispatch();
  const { addresses, isLoading, error, showAddressSelector } = useAppSelector(
    (state) => state.address
  );

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (!showAddressSelector) return null;

  // Renderizar un mensaje de carga o error si es necesario
  if (isLoading)
    return <div className="loading-indicator">Cargando direcciones...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
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
          {addresses.map((address) => (
            <div
              key={address.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => dispatch(selectAddress(address))}
            >
              <div className="font-medium">
                {address.street} {address.number}
              </div>
              <div className="text-gray-500">
                {address.city}, {address.country}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
