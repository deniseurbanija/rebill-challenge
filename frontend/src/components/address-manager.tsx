// Componente principal que orquesta la lógica de ambos componentes
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // Asumiendo que usas esta utilidad
import { AddressSearch } from "./address-search";
import AddressForm from "./address-form";

interface AddressData {
  country: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  extraInfo?: string;
  placeId?: string;
  address?: string;
  sameAsShipping?: boolean;
}

interface AddressManagerProps {
  onSave?: (
    billingData: AddressData,
    shippingData?: AddressData
  ) => Promise<void>;
  initialBillingAddress?: AddressData;
  initialShippingAddress?: AddressData;
  className?: string;
}

export default function AddressManager({
  onSave,
  initialBillingAddress,
  initialShippingAddress,
  className,
}: AddressManagerProps) {
  // states that show which components are shown
  const [showBillingSearch, setShowBillingSearch] = useState(true);
  const [showShippingSearch, setShowShippingSearch] = useState(true);

  // states to storage the addresses
  const [billingAddress, setBillingAddress] = useState<AddressData>(
    initialBillingAddress || {
      country: "",
      sameAsShipping: true,
    }
  );

  const [shippingAddress, setShippingAddress] = useState<AddressData>(
    initialShippingAddress || {
      country: "",
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sameAsShipping, setSameAsShipping] = useState(
    initialBillingAddress?.sameAsShipping !== false
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // updates states when sameAsShipping changes
  useEffect(() => {
    if (sameAsShipping) {
      // hides shipping search if the address is the same as billing
      setShowShippingSearch(false);
    }
  }, [sameAsShipping]);

  // convert Google addresses to AddressData
  const parseGoogleAddress = async (
    googleAddress: string,
    placeId: string,
    country: string
  ): Promise<AddressData> => {
    try {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      return new Promise((resolve, reject) => {
        service.getDetails(
          {
            placeId,
            fields: [
              "address_components",
              "formatted_address",
              "name",
              "place_id",
            ],
          },
          (place, status) => {
            if (
              status !== google.maps.places.PlacesServiceStatus.OK ||
              !place?.address_components
            ) {
              reject(
                new Error("No se pudieron obtener los detalles de la dirección")
              );
              return;
            }

            // extacts address components
            const addressComponents = place.address_components;
            const streetNumber = addressComponents.find((component) =>
              component.types.includes("street_number")
            )?.long_name;
            const route = addressComponents.find((component) =>
              component.types.includes("route")
            )?.long_name;
            const city = addressComponents.find((component) =>
              component.types.includes("locality")
            )?.long_name;
            const state = addressComponents.find((component) =>
              component.types.includes("administrative_area_level_1")
            )?.long_name;
            const zipCode = addressComponents.find((component) =>
              component.types.includes("postal_code")
            )?.long_name;

            const street = [streetNumber, route].filter(Boolean).join(" ");

            resolve({
              country,
              street,
              city: city || "",
              state: state || "",
              zipCode: zipCode || "",
              placeId,
              address: place.formatted_address || googleAddress,
            });
          }
        );
      });
    } catch (error) {
      console.error("Error al obtener detalles de la dirección:", error);
      const parts = googleAddress.split(",").map((part) => part.trim());
      return {
        country,
        street: parts[0] || "",
        city: parts[1] || "",
        state: parts[2] ? parts[2].split(" ")[0] : "",
        zipCode: parts[2] ? parts[2].split(" ")[1] : "",
        placeId,
        address: googleAddress,
      };
    }
  };

  // handler for google search
  const handleBillingAddressSelect = async ({
    country,
    address,
    placeId,
  }: {
    country: string;
    address: string;
    placeId: string;
  }) => {
    const parsedAddress = await parseGoogleAddress(address, placeId, country);
    setBillingAddress({ ...parsedAddress, sameAsShipping });
    setShowBillingSearch(false);
  };

  const handleShippingAddressSelect = async ({
    country,
    address,
    placeId,
  }: {
    country: string;
    address: string;
    placeId: string;
  }) => {
    const parsedAddress = await parseGoogleAddress(address, placeId, country);
    setShippingAddress(parsedAddress);
    setShowShippingSearch(false);
  };

  // handler for manual entry
  const handleBillingManualEntry = () => {
    setShowBillingSearch(false);
  };

  const handleShippingManualEntry = () => {
    setShowShippingSearch(false);
  };

  // handler for saving forms
  const handleBillingFormSave = async (formData: AddressData) => {
    setBillingAddress({ ...formData, sameAsShipping });

    if (sameAsShipping) {
      await handleFinalSave(
        { ...formData, sameAsShipping: true },
        { ...formData }
      );
    }
  };

  const handleShippingFormSave = async (formData: AddressData) => {
    setShippingAddress(formData);

    if (billingAddress.country && billingAddress.street) {
      await handleFinalSave(billingAddress, formData);
    }
  };

  // function for saving both addresses
  const handleFinalSave = async (
    billing: AddressData,
    shipping: AddressData
  ) => {
    setIsSubmitting(true);
    try {
      if (onSave) {
        await onSave(billing, shipping);
      } else {
        setBillingAddress(billing);
        setShippingAddress(shipping);
      }
    } catch (error) {
      console.error("Error al guardar las direcciones:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSameAsShippingChange = (newSameAsShipping: boolean) => {
    setSameAsShipping(newSameAsShipping);
    if (newSameAsShipping) {
      setShowShippingSearch(false);
    } else {
      setShowShippingSearch(true);
    }
  };

  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="w-full">
        {showBillingSearch ? (
          <AddressSearch
            title="Billing address"
            showSameAsShipping={true}
            onAddressSelect={handleBillingAddressSelect}
            onManualEntry={handleBillingManualEntry}
            onSameAsShippingChange={handleSameAsShippingChange}
            sameAsShipping={sameAsShipping}
          />
        ) : (
          <AddressForm
            title="Billing address"
            showSameAsShipping={true}
            initialAddress={billingAddress}
            onSave={handleBillingFormSave}
            onSameAsShippingChange={handleSameAsShippingChange}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {!sameAsShipping && (
        <div className="w-full">
          {showShippingSearch ? (
            <AddressSearch
              title="Shipping address"
              showSameAsShipping={false}
              onAddressSelect={handleShippingAddressSelect}
              onManualEntry={handleShippingManualEntry}
            />
          ) : (
            <AddressForm
              title="Shipping address"
              showSameAsShipping={false}
              initialAddress={shippingAddress}
              onSave={handleShippingFormSave}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      )}
    </div>
  );
}
