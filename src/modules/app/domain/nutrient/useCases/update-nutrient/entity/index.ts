import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { NutrientDTO } from '../../../dtos';
import { UpdateNutrientDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateNutrient {
  private readonly toCreate: UpdateNutrientDTO;
  protected idOrError!: ValidateResponse<ValidateUUID>;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected abbreviationOrError!: ValidateResponse<ValidateString>;
  protected unitMeasureOrError!: ValidateResponse<ValidateString>;

  constructor(data: NutrientDTO & { id: string }) {
    this.set(data);

    this.assert(
      this.idOrError,
      this.nameOrError,
      this.abbreviationOrError,
      this.unitMeasureOrError
    );

    const id = this.idOrError.value;
    const name = this.nameOrError.value;
    const abbreviation = this.abbreviationOrError.value;
    const unitMeasure = this.unitMeasureOrError.value;

    this.toCreate = this.afterValidate({ id, name, abbreviation, unitMeasure });
  }

  private set(data: NutrientDTO & { id: string }): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.idOrError = ValidateUUID.exec(data.id, { errorMessage: errorMessage.id });

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
      id: 'The nutrient id is invalid',
      name: `The name "${data.name}" is invalid`,
      abbreviation: `The abbreviation "${data.abbreviation}" is invalid`,
      unitMeasure: `The unit measure "${data.unitMeasure}" is invalid`
    };
  }

  private afterValidate(validated: Validated): UpdateNutrientDTO {
    return {
      id: validated.id.value,
      abbreviation: validated.abbreviation.value,
      name: validated.name.value.toUpperCase(),
      unitMeasure: validated.unitMeasure.value
    };
  }

  public get value(): Readonly<UpdateNutrientDTO> {
    return Object.freeze(this.toCreate);
  }
}
