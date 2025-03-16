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
