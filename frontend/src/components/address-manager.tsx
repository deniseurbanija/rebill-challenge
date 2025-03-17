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
  apartment?: string;
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
  // Estado para controlar qué se muestra (búsqueda o formulario manual)
  const [showBillingSearch, setShowBillingSearch] = useState(true);
  const [showShippingSearch, setShowShippingSearch] = useState(true);

  // Estado para almacenar datos de direcciones
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

  // Estado para controlar si las direcciones son iguales
  const [sameAsShipping, setSameAsShipping] = useState(
    initialBillingAddress?.sameAsShipping !== false
  );

  // Estado para controlar si estamos en proceso de guardado
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efecto para actualizar los estados cuando cambia sameAsShipping
  useEffect(() => {
    if (sameAsShipping) {
      // Si son iguales, ocultamos la sección de envío
      setShowShippingSearch(false);
    } else if (!showShippingSearch) {
      // Si acabamos de desmarcar la opción, mostramos la búsqueda de envío
      setShowShippingSearch(true);
    }
  }, [sameAsShipping, showShippingSearch]);

  // Función para convertir dirección de Google a AddressData
  const parseGoogleAddress = (
    googleAddress: string,
    placeId: string,
    country: string
  ): AddressData => {
    // Esta función debería parsear la dirección de Google Places
    // y extraer street, city, state, zipCode
    // Lo ideal sería usar el placeId para obtener los detalles completos de la dirección

    // Este es un ejemplo simplificado. En producción, deberías usar la API de Google Places para obtener detalles
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
  };

  // Manejador para cuando se selecciona una dirección de Google
  const handleBillingAddressSelect = ({
    country,
    address,
    placeId,
  }: {
    country: string;
    address: string;
    placeId: string;
  }) => {
    const parsedAddress = parseGoogleAddress(address, placeId, country);
    setBillingAddress({ ...parsedAddress, sameAsShipping });
    setShowBillingSearch(false);
  };

  const handleShippingAddressSelect = ({
    country,
    address,
    placeId,
  }: {
    country: string;
    address: string;
    placeId: string;
  }) => {
    const parsedAddress = parseGoogleAddress(address, placeId, country);
    setShippingAddress(parsedAddress);
    setShowShippingSearch(false);
  };

  // Manejadores para entrada manual
  const handleBillingManualEntry = () => {
    setShowBillingSearch(false);
  };

  const handleShippingManualEntry = () => {
    setShowShippingSearch(false);
  };

  // Manejadores para guardar las formas
  const handleBillingFormSave = async (formData: AddressData) => {
    setBillingAddress({ ...formData, sameAsShipping });

    if (sameAsShipping) {
      // Si las direcciones son iguales, guardamos la misma para ambas
      await handleFinalSave(
        { ...formData, sameAsShipping: true },
        { ...formData }
      );
    }
  };

  const handleShippingFormSave = async (formData: AddressData) => {
    setShippingAddress(formData);

    // Si ya tenemos ambas direcciones, podemos guardar
    if (billingAddress.country && billingAddress.street) {
      await handleFinalSave(billingAddress, formData);
    }
  };

  // Función para guardar ambas direcciones
  const handleFinalSave = async (
    billing: AddressData,
    shipping: AddressData
  ) => {
    setIsSubmitting(true);
    try {
      if (onSave) {
        await onSave(billing, shipping);
      } else {
        // Si no hay onSave, solo actualizamos el estado local
        setBillingAddress(billing);
        setShippingAddress(shipping);
      }
    } catch (error) {
      console.error("Error al guardar las direcciones:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejador para el cambio de "Same as Shipping"
  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    setBillingAddress((prev) => ({ ...prev, sameAsShipping: checked }));

    if (checked && !showBillingSearch) {
      // Si marcamos la opción y ya teníamos un formulario de facturación completo
      handleFinalSave(
        { ...billingAddress, sameAsShipping: true },
        billingAddress
      );
    }
  };

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Sección de facturación */}
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

      {/* Sección de envío (solo se muestra si sameAsShipping es false) */}
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
