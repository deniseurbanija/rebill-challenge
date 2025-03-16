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
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const address = this.addressRepository.create(createAddressDto);
      return await this.addressRepository.save(address);
    } catch (error) {
      throw new InternalServerErrorException('Error saving the address.');
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
      throw error; // Let NestJS handle known errors
    }
  }
}
