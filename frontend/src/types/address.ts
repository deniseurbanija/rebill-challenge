export interface AddressData {
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

export interface AddressSearchProps {
  title?: string;
  showSameAsShipping?: boolean;
  onAddressSelect?: (address: {
    country: string;
    address: string;
    placeId: string;
  }) => void;
  onManualEntry?: () => void;
  onSameAsShippingChange?: (checked: boolean) => void;
  sameAsShipping?: boolean;
  className?: string;
}

export interface AddressFormProps {
  title?: string;
  showSameAsShipping?: boolean;
  initialAddress?: AddressData;
  onSave: (formData: AddressData) => Promise<void>;
  onSameAsShippingChange?: (checked: boolean) => void;
  isSubmitting?: boolean;
  className?: string;
}

export interface AddressFormData extends AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  apartment?: string;
}

export interface CountryValidation {
  zipCodePattern: RegExp;
  zipCodeExample: string;
  hasStates: boolean;
  states?: string[];
  stateLabel: string;
}

export interface ValidationErrors {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
