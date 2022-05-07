import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDTO } from '../dtos';

@Injectable()
export class UpdateUserRepository {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  public inactive(id: string): Promise<UpdateResult> {
    return this.user.update({ id }, { status: 'DELETED' });
  }

  public exec(data: Omit<UpdateUserDTO, 'address'>): Promise<UpdateResult> {
    return this.user.update({ id: data.id }, data);
  }
}
