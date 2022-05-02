import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';
import { FindReferenceRepository } from '../../find-reference/repository';
import { UpdateReferenceDTO } from '../dtos';
import { UpdateReferenceRepository } from '../repository';

type Errors = {
  conflict: string;
  notFound: string;
};

@Injectable()
export class UpdateReferenceService {
  constructor(
    private readonly updateReference: UpdateReferenceRepository,
    private readonly findReference: FindReferenceRepository
  ) {}

  private errorMessage(data: UpdateReferenceDTO): Errors {
    return {
      conflict: `The name "${data.name}" already exists`,
      notFound: 'Reference is not found'
    };
  }

  public async exec(data: UpdateReferenceDTO): UpdateResponse<UpdateReferenceDTO> {
    const error = this.errorMessage(data);

    const [original, nameExists] = await Promise.all([
      this.findReference.byId(data.id),
      this.findReference.byName(data.name, data.abbreviation)
    ]);

    if (!original) return left(new NotFoundException(error.notFound));

    if (!!nameExists && nameExists.id !== data.id)
      return left(new ConflictException(error.conflict));

    await this.updateReference.exec(data);

    return right(data);
  }
}
