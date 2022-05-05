import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { CompositionNutrientDTO } from '../../../dtos';
import { UpdateCompositionNutrientDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateCompositionNutrient {
  private readonly toUpdate: UpdateCompositionNutrientDTO;
  protected compositionIdOrError!: ValidateResponse<ValidateUUID>;
  protected nutrientIdOrError!: ValidateResponse<ValidateUUID>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: CompositionNutrientDTO & { compositionId: string }) {
    this.set(data);

    this.assert(this.compositionIdOrError, this.nutrientIdOrError, this.quantityOrError);

    const compositionId = this.compositionIdOrError.value;
    const nutrientId = this.nutrientIdOrError.value;
    const quantity = this.quantityOrError.value;

    this.toUpdate = this.afterAssert({ compositionId, nutrientId, quantity });
  }

  private set(
    data: CompositionNutrientDTO & { compositionId: string }
  ): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.compositionIdOrError = ValidateUUID.exec(data.compositionId, {
      errorMessage: errorMessage.compositionId
    });

    this.nutrientIdOrError = ValidateUUID.exec(data.nutrient?.id, {
      errorMessage: errorMessage.nutrientId
    });

    this.quantityOrError = ValidateNumber.exec(
      data.quantity,
      { isOptional: false },
      { errorMessage: errorMessage.quantity }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: CompositionNutrientDTO & { compositionId: string }): Errors {
    return {
      compositionId: `The composition id "${data.compositionId}" is invalid`,
      nutrientId: `The composition nutrient id "${data.nutrient?.id}" is invalid`,
      quantity: `The composition nutrient quantity "${data.quantity}" is invalid`
    };
  }

  private afterAssert(validated: Validated): UpdateCompositionNutrientDTO {
    return {
      compositionId: validated.compositionId.value,
      nutrientId: validated.nutrientId.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<UpdateCompositionNutrientDTO> {
    return Object.freeze(this.toUpdate);
  }
}
