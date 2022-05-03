import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { CookingMeasureDTO } from '../../../dtos';
import { CreateCookingMeasureDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateCookingMeasure {
  private readonly toCreate: CreateCookingMeasureDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;

  constructor(data: CookingMeasureDTO) {
    this.set(data);

    this.assert(this.nameOrError);

    const name = this.nameOrError.value;

    this.toCreate = this.afterAssert({ name });
  }

  private set(data: CookingMeasureDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.COOKING_MEASURE_NAME },
      { errorMessage: errorMessage.name }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: CookingMeasureDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`
    };
  }

  private afterAssert(validated: Validated): CreateCookingMeasureDTO {
    return {
      name: validated.name.value.toUpperCase()
    };
  }

  public get value(): Readonly<CreateCookingMeasureDTO> {
    return Object.freeze(this.toCreate);
  }
}
