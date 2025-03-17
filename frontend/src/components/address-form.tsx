"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getCountryValidation,
  validateAddressForm,
} from "@/lib/country-validations";
import type {
  AddressFormProps,
  AddressFormData,
  ValidationErrors,
} from "@/types/address";
import { countriesData } from "@/data/countries-data";
import { AddressFormHeader } from "@/components/address-form-header";

export default function AddressForm({
  title = "Billing address",
  showSameAsShipping = true,
  initialAddress,
  onSave,
  onSameAsShippingChange,
  isSubmitting = false,
  className,
}: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    country: initialAddress?.country || "",
    street: initialAddress?.street || "",
    city: initialAddress?.city || "",
    state: initialAddress?.state || "",
    zipCode: initialAddress?.zipCode || "",
    extraInfo: initialAddress?.extraInfo || "",
    sameAsShipping: initialAddress?.sameAsShipping || false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [moreDetails, setMoreDetails] = useState(!!initialAddress?.extraInfo);
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

    if (onSameAsShippingChange) {
      onSameAsShippingChange(checked);
    }
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

    // Call the onSave callback if provided
    if (onSave) {
      await onSave(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-96 p-4 space-y-4", className)}
    >
      <AddressFormHeader
        title={title}
        showSameAsShipping={showSameAsShipping}
        sameAsShipping={formData.sameAsShipping}
        onSameAsShippingChange={handleSameAsShippingChange}
      />

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
              id="extraInfo"
              name="extraInfo"
              value={formData.extraInfo}
              placeholder="Apartment, Unit, Floor (optional)"
              onChange={handleInputChange}
              className="mt-1"
            />
          ) : (
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm text-[#3B4049]"
              onClick={() => setMoreDetails(true)}
            >
              + Add additional information
            </Button>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black hover:bg-gray-800 text-white rounded-md h-9 mt-6 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
