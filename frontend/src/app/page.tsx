"use client";
import AddressManager from "@/components/address-manager";
import type { AddressData } from "@/types/address";
import { toast } from "sonner";

export default function Home() {
  const handleSave = async (
    billingData: AddressData,
    shippingData?: AddressData
  ) => {
    toast("Address has been registered successfully");
    console.log("Billing address:", billingData);
    if (shippingData) {
      console.log("Shipping address:", shippingData);
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
