"use client";
import AddressManager from "@/components/address-manager";
import type { AddressData } from "@/types/address";
import { toast } from "sonner";
import axios from "axios";

const api_url = "http://localhost:3000/addresses";
export default function Home() {
  const handleSave = async (
    billingData: AddressData,
    shippingData?: AddressData
  ) => {
    try {
      const payload = {
        billingAddress: billingData,
        shippingAddress: shippingData || undefined, // Solo lo envía si existe
        sameAsShipping: !shippingData, // true si no hay shippingData
      };

      const response = await axios.post(api_url, payload);

      console.log("API RESPONSE ", response.data);
      toast.success("Address has been registered successfully");
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24">
      <div>
        <AddressManager onSave={handleSave} />
      </div>
    </main>
  );
}
