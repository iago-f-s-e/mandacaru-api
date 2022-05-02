import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateReferenceDTO } from '../dtos';

@Injectable()
export class CreateReferenceRepository {
  constructor(@InjectRepository(Reference) private readonly reference: Repository<Reference>) {}

  public exec(data: CreateReferenceDTO): Promise<Reference> {
    return this.reference.save(this.reference.create(data));
  }
}
