"use client";
import { AddressSearch } from "@/components/address-search";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24">
      <div>
        <AddressSearch
          onAddressSelect={(address) => {
            console.log("Selected address (API):", address);
          }}
        />
      </div>
    </main>
  );
}
