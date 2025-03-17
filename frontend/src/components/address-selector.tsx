"use client";

import { useState } from "react";
import { NavigationBar } from "./navigation-bar";

interface Address {
  street: string;
  number: string;
  city: string;
  country: string;
}

export function AddressSelector() {
  const [expanded, setExpanded] = useState(false);

  const addresses: Address[] = [
    {
      street: "El Salvador",
      number: "5218",
      city: "Cdad. Autónoma de Buenos Aires",
      country: "Argentina",
    },
    {
      street: "El Salvador",
      number: "5312",
      city: "Cdad. Autónoma de Buenos Aires",
      country: "Argentina",
    },
    // Additional addresses would go here to make up the 5 results
  ];

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden max-w-xl w-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Select a saved address
          </h2>
          <span className="text-sm text-gray-500">5 results</span>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {addresses.map((address, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
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

      <div className="border-t border-gray-200 p-4">
        <NavigationBar
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          onClose={() => console.log("Close clicked")}
        />
      </div>
    </div>
  );
}
