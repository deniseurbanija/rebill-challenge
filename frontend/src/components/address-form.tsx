"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";
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
import {
  getCountryValidation,
  validateAddressForm,
} from "@/lib/country-validations";
import { saveAddress } from "@/lib/address-service";
import type {
  AddressFormProps,
  AddressFormData,
  ValidationErrors,
} from "@/types/address";
import { countriesData } from "@/data/countries-data";

export default function AddressForm({
  title = "Billing address",
  showSameAsShipping = true,
  initialAddress,
  onSave,
  className,
}: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    country: initialAddress?.country || "",
    street: initialAddress?.street || "",
    city: initialAddress?.city || "",
    state: initialAddress?.state || "",
    zipCode: initialAddress?.zipCode || "",
    apartment: initialAddress?.apartment || "",
    sameAsShipping: initialAddress?.sameAsShipping || false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);
  const [countryValidation, setCountryValidation] = useState(
    getCountryValidation(formData.country)
  );

  const countries = countriesData.map(({ country, isoCountryCode }) => ({
    name: country,
    code: isoCountryCode,
  }));

  // Update validation rules when country changes
  useEffect(() => {
    setCountryValidation(getCountryValidation(formData.country));
  }, [formData.country]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user selects
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, sameAsShipping: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Skip validation if "Same as shipping" is checked
    if (formData.sameAsShipping) {
      if (onSave) {
        await onSave(formData);
      }
      return;
    }

    // Validate form
    const validationErrors = validateAddressForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors
    setErrors({});
    // Submit form
    setIsSubmitting(true);

    try {
      // Call the API to save the address
      const result = await saveAddress(formData);

      // Call the onSave callback if provided
      if (onSave) {
        await onSave(formData);
      }

      // You could show a success message here
      console.log("Address saved:", result);
    } catch (error) {
      console.error("Error saving address:", error);
      // You could show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-96 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="text-sm text-[#3B4049]">{title}</h3>
          <Info className="h-4 w-4 text-muted-foreground cursor-help opacity-50" />
        </div>
        {showSameAsShipping && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="sameAsShipping"
              checked={formData.sameAsShipping}
              onCheckedChange={handleSameAsShippingChange}
              className="h-4 w-4 border-[#EBEDEF] data-[state=checked]:bg-blue-600"
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
          value={formData.country}
          onValueChange={(value) => handleSelectChange("country", value)}
        >
          <SelectTrigger className="w-full h-10 rounded-md border-[#EBEDEF] bg-white">
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

        <div>
          <Input
            id="street"
            name="street"
            value={formData.street}
            placeholder="Address street*"
            onChange={handleInputChange}
            className={cn(
              "mt-1",
              errors.street &&
                "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-500">{errors.street}</p>
          )}
        </div>

        <div>
          <Input
            id="city"
            name="city"
            value={formData.city}
            placeholder="City*"
            onChange={handleInputChange}
            className={cn(
              "mt-1",
              errors.city &&
                "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {countryValidation.hasStates ? (
            <div>
              <Select
                value={formData.state}
                onValueChange={(value) => handleSelectChange("state", value)}
              >
                <SelectTrigger
                  className={cn(
                    "w-full h-10 rounded-md border-[#EBEDEF] bg-white mt-1",
                    errors.state &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                >
                  <SelectValue
                    placeholder={`Select ${countryValidation.stateLabel.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {countryValidation.states?.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
              )}
            </div>
          ) : (
            <div>
              <label htmlFor="state" className="text-sm text-gray-500"></label>
              <Input
                placeholder={`${countryValidation.stateLabel}*`}
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={cn(
                  "mt-1",
                  errors.state &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
              )}
            </div>
          )}

          <div>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              placeholder="Zip code*"
              onChange={handleInputChange}
              className={cn(
                "mt-1",
                errors.zipCode &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div>
          {moreDetails ? (
            <Input
              id="apartment"
              name="apartment"
              value={formData.apartment}
              placeholder="Apartment, Unit, Floor (optional)"
              onChange={handleInputChange}
              className="mt-1"
            />
          ) : (
            <Button variant="link" onClick={() => setMoreDetails(true)}>
              + Add additional information
            </Button>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="w-full bg-black hover:bg-gray-800 text-white rounded-md h-9 mt-6"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
