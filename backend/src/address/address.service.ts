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
    const billingAddress = this.addressRepository.create({
      ...addressData.billingAddress,
      type: 'billing',
    });
    await this.addressRepository.save(billingAddress);

    let shippingAddress: Address | null = null;

    if (addressData.sameAsShipping) {
      // use the same info as billing
      shippingAddress = this.addressRepository.create({
        ...addressData.billingAddress,
        type: 'shipping',
        sameAsBilling: true,
      });
    } else {
      // use the different info
      shippingAddress = this.addressRepository.create({
        ...addressData.shippingAddress,
        type: 'shipping',
        sameAsBilling: false,
      });
    }

    if (shippingAddress) {
      await this.addressRepository.save(shippingAddress);
    }

    return { billingAddress, shippingAddress };
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
