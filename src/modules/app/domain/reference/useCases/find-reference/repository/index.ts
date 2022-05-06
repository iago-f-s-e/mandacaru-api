import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { iLikeGenerator } from '@src/modules/common/utils';
import { Reference } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { ListReferenceDTO } from '../dtos';

@Injectable()
export class FindReferenceRepository {
  constructor(@InjectRepository(Reference) private readonly reference: Repository<Reference>) {}

  public existing(name: string): Promise<Reference | null> {
    return this.reference.findOne({
      where: { name },
      select: { id: true, isActive: true }
    });
  }

  public byId(id: string): Promise<Reference | null> {
    return this.reference.findOneBy({ id, isActive: true });
  }

  public exec(filter: ListReferenceDTO): Promise<Reference[]> {
    const ilike = iLikeGenerator(filter, 'reference');

    return this.reference
      .createQueryBuilder('reference')
      .where('reference.isActive = true')
      .andWhere(ilike.query, ilike.params)
      .orderBy('reference.name', 'ASC')
      .getMany();
  }
}
