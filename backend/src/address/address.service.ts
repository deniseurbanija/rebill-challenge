import { Injectable } from '@nestjs/common';
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

  create(addressDto: CreateAddressDto) {
    const address = this.addressRepository.create(addressDto);
    return this.addressRepository.save(address);
  }

  findAll() {
    return this.addressRepository.find();
  }

  async remove(id: number) {
    await this.addressRepository.delete(id);
  }
}
