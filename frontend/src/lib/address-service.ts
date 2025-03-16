import type { AddressFormData } from "@/types/address";

// Simula una llamada a la API para guardar la dirección
export async function saveAddress(
  addressData: AddressFormData
): Promise<{ success: boolean; message: string }> {
  // En un caso real, aquí harías una llamada fetch a tu backend
  console.log("Saving address:", addressData);

  // Simulamos un retraso para imitar una llamada a la API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulamos una respuesta exitosa
  return {
    success: true,
    message: "Address saved successfully",
  };

  // Para simular un error, podrías descomentar esto:
  // throw new Error("Failed to save address");
}

// Función para extraer información de una dirección de Google Places
export function extractAddressComponents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placeDetails: any
): Partial<AddressFormData> {
  if (!placeDetails || !placeDetails.address_components) {
    return {};
  }

  const components = placeDetails.address_components;
  const result: Partial<AddressFormData> = {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  };

  // Mapeo de tipos de componentes de Google a nuestros campos
  for (const component of components) {
    const types = component.types;

    if (types.includes("street_number")) {
      result.street = component.long_name + " " + (result.street || "");
    }

    if (types.includes("route")) {
      result.street = (result.street || "") + component.long_name;
    }

    if (types.includes("locality")) {
      result.city = component.long_name;
    }

    if (types.includes("administrative_area_level_1")) {
      result.state = component.long_name;
    }

    if (types.includes("postal_code")) {
      result.zipCode = component.long_name;
    }
  }

  return result;
}
