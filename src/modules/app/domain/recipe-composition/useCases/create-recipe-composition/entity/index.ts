import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { RecipeCompositionDTO } from '../../../dtos';
import { CreateRecipeCompositionDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateRecipeComposition {
  private readonly toCreate: CreateRecipeCompositionDTO;
  protected measureIdOrError!: ValidateResponse<ValidateUUID>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: RecipeCompositionDTO) {
    this.set(data);

    this.assert(this.measureIdOrError, this.quantityOrError);

    const measureId = this.measureIdOrError.value;
    const quantity = this.quantityOrError.value;

    this.toCreate = this.afterValidate({ measureId, quantity });
  }

  private set(data: RecipeCompositionDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.measureIdOrError = ValidateUUID.exec(data.measureId, {
      errorMessage: errorMessage.measureId
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

  private getErrorMessage(data: RecipeCompositionDTO): Errors {
    return {
      measureId: `The composition measure id "${data.measureId}" is invalid`,
      quantity: `The composition quantity "${data.quantity}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateRecipeCompositionDTO {
    return {
      alimentMeasureId: validated.measureId.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<CreateRecipeCompositionDTO> {
    return Object.freeze(this.toCreate);
  }
}
