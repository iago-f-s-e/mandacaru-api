import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { NutrientDTO } from '../../../dtos';
import { CreateNutrientDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateNutrient {
  private readonly toCreate: CreateNutrientDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected abbreviationOrError!: ValidateResponse<ValidateString>;
  protected unitMeasureOrError!: ValidateResponse<ValidateString>;

  constructor(data: NutrientDTO) {
    this.set(data);

    this.assert(this.nameOrError, this.abbreviationOrError, this.unitMeasureOrError);

    const name = this.nameOrError.value;
    const abbreviation = this.abbreviationOrError.value;
    const unitMeasure = this.unitMeasureOrError.value;

    this.toCreate = this.afterAssert({ name, abbreviation, unitMeasure });
  }

  private set(data: NutrientDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.NUTRIENT_NAME },
      { errorMessage: errorMessage.name }
    );

    this.abbreviationOrError = ValidateString.exec(
      data.abbreviation,
      { isOptional: false, maxSize: maxSize.ABBREVIATION },
      { errorMessage: errorMessage.abbreviation }
    );

    this.unitMeasureOrError = ValidateString.exec(
      data.unitMeasure,
      { isOptional: false, maxSize: maxSize.UNIT_MEASURE },
      { errorMessage: errorMessage.unitMeasure }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: NutrientDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`,
      abbreviation: `The abbreviation "${data.abbreviation}" is invalid`,
      unitMeasure: `The unit measure "${data.unitMeasure}" is invalid`
    };
  }

  private afterAssert(validated: Validated): CreateNutrientDTO {
    return {
      abbreviation: validated.abbreviation.value,
      name: validated.name.value.toUpperCase(),
      unitMeasure: validated.unitMeasure.value
    };
  }

  public get value(): Readonly<CreateNutrientDTO> {
    return Object.freeze(this.toCreate);
  }
}
