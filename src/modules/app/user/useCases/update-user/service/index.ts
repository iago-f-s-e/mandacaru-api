import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDTO } from '@src/modules/app/address/useCases/update-address/dtos';
import { UpdateAddressService } from '@src/modules/app/address/useCases/update-address/service';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';
import { FindUserRepository } from '../../find-user/repository';
import { UpdateUserDTO } from '../dtos';
import { UpdateUserRepository } from '../repository';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly findUser: FindUserRepository,
    private readonly updateUser: UpdateUserRepository,
    private readonly updateAddressService: UpdateAddressService
  ) {}

  private async updateAddress(data: UpdateAddressDTO): Promise<void> {
    await this.updateAddressService.exec(data);
  }

  private errorMessage(): string {
    return 'User is not found';
  }
  public async exec(data: UpdateUserDTO): UpdateResponse<UpdateUserDTO> {
    const original = await this.findUser.byId(data.id);

    if (!original) return left(new NotFoundException(this.errorMessage()));

    const { address, ...user } = data;

    if (address) await this.updateAddress(address);

    await this.updateUser.exec(user);

    return right(data);
  }
}
