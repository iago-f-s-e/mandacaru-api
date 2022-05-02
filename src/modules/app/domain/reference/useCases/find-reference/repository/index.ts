import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindReferenceRepository {
  constructor(@InjectRepository(Reference) private readonly reference: Repository<Reference>) {}

  public byName(name: string, abbreviation: string): Promise<Reference | null> {
    return this.reference.findOneBy({ name, abbreviation });
  }

  public byId(id: string): Promise<Reference | null> {
    return this.reference.findOneBy({ id, isActive: true });
  }

  public exec(): Promise<Reference[]> {
    return this.reference.findBy({ isActive: true });
  }
}
