import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';
import { FindNutrientRepository } from '../../find-nutrient/repository';
import { UpdateNutrientDTO } from '../dtos';
import { UpdateNutrientRepository } from '../repository';

type Errors = {
  conflict: string;
  notFound: string;
};

@Injectable()
export class UpdateNutrientService {
  constructor(
    private readonly updateNutrient: UpdateNutrientRepository,
    private readonly findNutrient: FindNutrientRepository
  ) {}

  private errorMessage(data: UpdateNutrientDTO): Errors {
    return {
      conflict: `The name "${data.name}" already exists`,
      notFound: 'Nutrient is not found'
    };
  }

  public async exec(data: UpdateNutrientDTO): UpdateResponse<UpdateNutrientDTO> {
    const error = this.errorMessage(data);

    const [original, existing] = await Promise.all([
      this.findNutrient.byId(data.id),
      this.findNutrient.existing(data.name)
    ]);

    if (!original) return left(new NotFoundException(error.notFound));

    if (!!existing && existing.id !== data.id) return left(new ConflictException(error.conflict));

    await this.updateNutrient.exec(data);

    return right(data);
  }
}
