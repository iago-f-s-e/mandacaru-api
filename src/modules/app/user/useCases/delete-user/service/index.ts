import { Injectable } from '@nestjs/common';
import { UpdateUserRepository } from '../../update-user/repository';

@Injectable()
export class DeleteUserService {
  constructor(private readonly updateUser: UpdateUserRepository) {}

  public async exec(id: string): Promise<void> {
    await this.updateUser.inactive(id);
  }
}
