import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Composition } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindCompositionRepository {
  constructor(
    @InjectRepository(Composition) private readonly composition: Repository<Composition>
  ) {}

  public byId(id: string): Promise<Composition | null> {
    return this.composition
      .createQueryBuilder('composition')
      .leftJoinAndSelect('composition.nutrients', 'nutrients')
      .innerJoinAndSelect('composition.reference', 'reference', 'reference.isActive = true')
      .where('composition.id = :id', { id })
      .getOne();
  }
}
