import { Address } from 'src/entities/Address';

export interface SaveAddressResponse {
  billingAddress: Address;
  shippingAddress: Address | null;
}
