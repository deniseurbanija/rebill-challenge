/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from 'src/entities/Address';
import { SaveAddressesDto } from './dto/address.dto';
import { SaveAddressResponse } from './types/address.types';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async saveAddress(
    addressData: SaveAddressesDto,
  ): Promise<SaveAddressResponse> {
    // Verificar si las direcciones son idénticas
    const areAddressesIdentical =
      addressData.sameAsShipping ||
      (addressData.billingAddress &&
        addressData.shippingAddress &&
        JSON.stringify(addressData.billingAddress) ===
          JSON.stringify(addressData.shippingAddress));

    if (areAddressesIdentical) {
      // Si son idénticas, guarda solo una dirección con tipo combinado
      const combinedAddress = this.addressRepository.create({
        ...addressData.billingAddress,
        type: 'billing-shipping',
        sameAsBilling: true,
      });
      await this.addressRepository.save(combinedAddress);

      return {
        billingAddress: combinedAddress,
        shippingAddress: combinedAddress,
      };
    } else {
      // Si son diferentes, guarda ambas direcciones
      const billingAddress = this.addressRepository.create({
        ...addressData.billingAddress,
        type: 'billing',
      });
      await this.addressRepository.save(billingAddress);

      const shippingAddress = this.addressRepository.create({
        ...addressData.shippingAddress,
        type: 'shipping',
        sameAsBilling: false,
      });
      await this.addressRepository.save(shippingAddress);

      return { billingAddress, shippingAddress };
    }
  }

  async getAddresses(): Promise<Address[]> {
    try {
      return await this.addressRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving addresses.');
    }
  }

  async deleteAddress(id: string): Promise<void> {
    try {
      const result = await this.addressRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Address with ID ${id} not found.`);
      }
    } catch (error) {
      throw error; // NestJS handle known errors
    }
  }
}
