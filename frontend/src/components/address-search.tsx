"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Check, Info, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGooglePlacesAutocomplete } from "@/hooks/use-google-places-autocomplete";
import type { AddressSearchProps } from "@/types/address";
import { countriesData } from "@/data/countries-data";
import { FormattedCountry } from "@/types/country";

export function AddressSearch({
  title = "Billing address",
  showSameAsShipping = true,
  onAddressSelect,
  className,
}: AddressSearchProps) {
  const [country, setCountry] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [touched, setTouched] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const countries = countriesData.map(
    ({ country, isoCountryCode }): FormattedCountry => ({
      name: country,
      code: isoCountryCode,
    })
  );

  const { predictions, fetchPredictions, clearPredictions } =
    useGooglePlacesAutocomplete(country);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    setSelectedAddress(null);

    if (value.length > 2) {
      fetchPredictions(value);
    } else {
      clearPredictions();
    }
  };

  const handleAddressSelect = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    setAddress(prediction.description);
    setSelectedAddress(prediction.description);
    clearPredictions();

    if (onAddressSelect) {
      onAddressSelect({
        country,
        address: prediction.description,
        placeId: prediction.place_id,
      });
    }
  };

  const handleManualEntry = () => {
    setManualEntry(true);
    clearPredictions();

    // Focus the input after switching to manual mode
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setSelectedAddress(null);
    setAddress("");
    clearPredictions();
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
  };

  const isValid = !touched || sameAsShipping || (country && selectedAddress);

  return (
    <div className={cn("w-96 p-4 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="text-sm text-[#3B4049]">{title}</h3>
          <Info className="h-4 w-4 text-muted-foreground cursor-help opacity-50" />
        </div>
        {showSameAsShipping && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="sameAsShipping"
              checked={sameAsShipping}
              onCheckedChange={handleSameAsShippingChange}
            />
            <label
              htmlFor="sameAsShipping"
              className="text-sm text-[#3B4049] cursor-pointer"
            >
              Same as shipping
            </label>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Select
          value={country}
          onValueChange={handleCountryChange}
          onOpenChange={() => setTouched(true)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search address"
              value={address}
              onChange={handleInputChange}
              className={cn(
                "pr-10",
                !isValid && touched && !sameAsShipping && "border-red-500"
              )}
              onFocus={() => setTouched(true)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search className="h-4 w-4" />
            </button>
            <div className="relative">
              {!isValid && touched && !sameAsShipping && (
                <p className="absolute mt-1 text-sm text-red-500">
                  Please select a country and address
                </p>
              )}
            </div>
          </div>

          {predictions.length > 0 && !manualEntry && (
            <div className="absolute z-10 w-full mt-1 bg-background border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {predictions.map((prediction) => (
                <div
                  key={prediction.place_id}
                  className="px-3 py-3 bg-white hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                  onClick={() => handleAddressSelect(prediction)}
                >
                  <span>{prediction.description}</span>
                  {selectedAddress === prediction.description && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {!manualEntry && (
          <Button
            variant="link"
            className="p-0 h-auto mt-4 text-sm text-[#3B4049]"
            onClick={handleManualEntry}
          >
            Enter address manually
          </Button>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-black hover:bg-gray-800 text-white rounded-md h-9 mt-6"
      ></Button>
    </div>
  );
}
