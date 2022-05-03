import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';
import { FindCookingMeasureRepository } from '../../find-cooking-measure/repository';
import { UpdateCookingMeasureDTO } from '../dtos';
import { UpdateCookingMeasureRepository } from '../repository';

type Errors = {
  conflict: string;
  notFound: string;
};

@Injectable()
export class UpdateCookingMeasureService {
  constructor(
    private readonly updateCookingMeasure: UpdateCookingMeasureRepository,
    private readonly findCookingMeasure: FindCookingMeasureRepository
  ) {}

  private errorMessage(data: UpdateCookingMeasureDTO): Errors {
    return {
      conflict: `The name "${data.name}" already exists`,
      notFound: 'Cooking measure is not found'
    };
  }

  public async exec(data: UpdateCookingMeasureDTO): UpdateResponse<UpdateCookingMeasureDTO> {
    const error = this.errorMessage(data);

    const [original, existing] = await Promise.all([
      this.findCookingMeasure.byId(data.id),
      this.findCookingMeasure.existing(data.name)
    ]);

    if (!original) return left(new NotFoundException(error.notFound));

    if (!!existing && existing.id !== data.id) return left(new ConflictException(error.conflict));

    await this.updateCookingMeasure.exec(data);

    return right(data);
  }
}
