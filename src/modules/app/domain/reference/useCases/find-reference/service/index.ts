import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { FindResponse } from '@src/modules/common/types/responses';
import { Reference } from '@src/modules/database/entities';
import { ListReferenceDTO } from '../dtos';
import { FindReferenceRepository } from '../repository';

@Injectable()
export class FindReferenceService {
  constructor(private readonly findReference: FindReferenceRepository) {}

  private errorMessage(): string {
    return 'Reference is not found';
  }

  public async byId(id: string): FindResponse<Reference> {
    const reference = await this.findReference.byId(id);

    if (!reference) return left(new NotFoundException(this.errorMessage()));

    return right(reference);
  }

  public exec(filter: ListReferenceDTO): Promise<Reference[]> {
    return this.findReference.exec(filter);
  }
}
