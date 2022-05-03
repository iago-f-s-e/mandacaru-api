import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { CookingMeasureDTO } from '../../../dtos';
import { UpdateCookingMeasureDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateCookingMeasure {
  private readonly toUpdate: UpdateCookingMeasureDTO;
  protected idOrError!: ValidateResponse<ValidateUUID>;
  protected nameOrError!: ValidateResponse<ValidateString>;

  constructor(data: CookingMeasureDTO & { id: string }) {
    this.set(data);

    this.assert(this.idOrError, this.nameOrError);

    const id = this.idOrError.value;
    const name = this.nameOrError.value;

    this.toUpdate = this.afterAssert({ id, name });
  }

  private set(data: CookingMeasureDTO & { id: string }): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.idOrError = ValidateUUID.exec(data.id, { errorMessage: errorMessage.id });

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
      id: 'The cooking measure id is invalid',
      name: `The name "${data.name}" is invalid`
    };
  }

  private afterAssert(validated: Validated): UpdateCookingMeasureDTO {
    return {
      id: validated.id.value,
      name: validated.name.value.toUpperCase()
    };
  }

  public get value(): Readonly<UpdateCookingMeasureDTO> {
    return Object.freeze(this.toUpdate);
  }
}
