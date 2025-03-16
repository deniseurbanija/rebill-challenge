export interface AddressData {
  country: string;
  address: string;
  placeId?: string;
}

export interface AddressSearchProps {
  title?: string;
  showSameAsShipping?: boolean;
  onAddressSelect?: (address: AddressData) => void;
  className?: string;
}

export interface AddressFormData {
  country: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  apartment?: string;
  sameAsShipping?: boolean;
}

export interface AddressFormProps {
  title?: string;
  showSameAsShipping?: boolean;
  initialAddress?: Partial<AddressFormData>;
  onSave?: (data: AddressFormData) => Promise<void>;
  className?: string;
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
