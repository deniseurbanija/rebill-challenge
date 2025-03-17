/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { SaveAddressesDto } from './dto/address.dto';
import { Address } from 'src/entities/Address';
import { SaveAddressResponse } from './types/address.types';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async saveAddress(
    @Body() addressData: SaveAddressesDto,
  ): Promise<SaveAddressResponse> {
    return this.addressService.saveAddress(addressData);
  }

  @Get()
  async getAddresses(): Promise<Address[]> {
    try {
      return await this.addressService.getAddresses();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: string): Promise<void> {
    try {
      await this.addressService.deleteAddress(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
