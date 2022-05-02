import { ConflictException, Injectable } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types/responses';
import { Reference } from '@src/modules/database/entities';
import { UpdateResult } from 'typeorm';
import { FindReferenceRepository } from '../../find-reference/repository';
import { UpdateReferenceRepository } from '../../update-reference/repository';
import { CreateReferenceDTO } from '../dtos';
import { CreateReferenceRepository } from '../repository';

@Injectable()
export class CreateReferenceService {
  constructor(
    private readonly createReference: CreateReferenceRepository,
    private readonly findReference: FindReferenceRepository,
    private readonly updateReference: UpdateReferenceRepository
  ) {}

  private errorMessage(data: CreateReferenceDTO): string {
    return `The name "${data.name}"  already exists`;
  }

  private insert(data: CreateReferenceDTO): Promise<Reference> {
    return this.createReference.exec(data);
  }

  private async reactive(id: string): Promise<UpdateResult> {
    return this.updateReference.reactive(id);
  }

  public async exec(data: CreateReferenceDTO): CreateResponse<Reference> {
    const found = await this.findReference.byName(data.name, data.abbreviation);

    if (!found) return right(await this.insert(data));

    if (found.isActive) return left(new ConflictException(this.errorMessage(data)));

    await this.reactive(found.id);

    return right(found);
  }
}
