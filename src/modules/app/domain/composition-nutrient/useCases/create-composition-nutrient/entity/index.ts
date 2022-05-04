import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { CompositionNutrientDTO } from '../../../dtos';
import { CreateCompositionNutrientDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateCompositionNutrient {
  private readonly toCreate: CreateCompositionNutrientDTO;
  protected nutrientIdOrError!: ValidateResponse<ValidateUUID>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: CompositionNutrientDTO) {
    this.set(data);

    this.assert(this.nutrientIdOrError, this.quantityOrError);

    const nutrientId = this.nutrientIdOrError.value;
    const quantity = this.quantityOrError.value;

    this.toCreate = this.afterAssert({ nutrientId, quantity });
  }

  private set(data: CompositionNutrientDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

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

  private getErrorMessage(data: CompositionNutrientDTO): Errors {
    return {
      nutrientId: `The composition nutrient id "${data.nutrient?.id}" is invalid`,
      quantity: `The composition nutrient quantity "${data.quantity}" is invalid`
    };
  }

  private afterAssert(validated: Validated): CreateCompositionNutrientDTO {
    return {
      nutrientId: validated.nutrientId.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<CreateCompositionNutrientDTO> {
    return Object.freeze(this.toCreate);
  }
}
