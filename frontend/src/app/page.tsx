"use client";

import AddressManager from "@/components/address-manager";
import type { AddressData } from "@/types/address";
import { toast } from "sonner";
import axios from "axios";
import { TestModeButton } from "@/components/test-mode-button";
import { AddressSelector } from "@/components/address-selector";
import { useState } from "react";

export default function Home() {
  const [showBar, setShowBar] = useState(false);

  const handleSave = async (
    billingData: AddressData,
    shippingData?: AddressData
  ) => {
    try {
      const payload = {
        billingAddress: billingData,
        shippingAddress: shippingData,
        sameAsShipping: !shippingData,
      };

      const response = await axios.post(
        "http://localhost:8000/addresses",
        payload
      );

      console.log("API RESPONSE ", response.data);
      toast.success("Address has been registered successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address");
    }
  };

  const handleAddressSelect = () => {
    setShowBar(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 ">
      <div>
        <AddressManager onSave={handleSave} />
      </div>
      <TestModeButton showBar={showBar} onShowBarChange={setShowBar} />
      <AddressSelector onAddressSelect={handleAddressSelect} />
    </main>
  );
}
