import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateReferenceDTO } from '../dtos';

@Injectable()
export class UpdateReferenceRepository {
  constructor(@InjectRepository(Reference) private readonly reference: Repository<Reference>) {}

  public reactive(id: string): Promise<UpdateResult> {
    return this.reference.update({ id }, { isActive: true });
  }

  public inactive(id: string): Promise<UpdateResult> {
    return this.reference.update({ id }, { isActive: false });
  }

  public exec(data: UpdateReferenceDTO): Promise<UpdateResult> {
    return this.reference.update({ id: data.id }, data);
  }
}
