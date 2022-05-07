import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserRepository {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  public existingByDocument(document: string): Promise<User | null> {
    return this.user.findOne({
      where: { document },
      select: {
        id: true
      }
    });
  }

  public existingByEmail(email: string): Promise<User | null> {
    return this.user.findOne({
      where: { email },
      select: {
        id: true
      }
    });
  }

  public byId(id: string): Promise<User | null> {
    return this.user
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .where('user.id = :id', { id })
      .andWhere('user.status <> :rejected', { rejected: 'REJECTED' })
      .andWhere('user.status <> :deleted', { deleted: 'DELETED' })
      .getOne();
  }
}
