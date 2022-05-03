import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

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

  public exec(): Promise<Reference[]> {
    return this.reference.findBy({ isActive: true });
  }
}
