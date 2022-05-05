import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { RecipeCompositionDTO } from '../../../dtos';
import { UpdateRecipeCompositionDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateRecipeComposition {
  private readonly toUpdate: UpdateRecipeCompositionDTO;
  protected recipeIdOrError!: ValidateResponse<ValidateUUID>;
  protected measureIdOrError!: ValidateResponse<ValidateUUID>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: RecipeCompositionDTO & { recipeId: string }) {
    this.set(data);

    this.assert(this.recipeIdOrError, this.measureIdOrError, this.quantityOrError);

    const recipeId = this.recipeIdOrError.value;
    const measureId = this.measureIdOrError.value;
    const quantity = this.quantityOrError.value;

    this.toUpdate = this.afterValidate({ recipeId, measureId, quantity });
  }

  private set(data: RecipeCompositionDTO & { recipeId: string }): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.recipeIdOrError = ValidateUUID.exec(data.recipeId, {
      errorMessage: errorMessage.recipeId
    });

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

  private getErrorMessage(data: RecipeCompositionDTO & { recipeId: string }): Errors {
    return {
      recipeId: `The recipe id "${data.recipeId}" is invalid`,
      measureId: `The composition measure id "${data.measureId}" is invalid`,
      quantity: `The composition quantity "${data.quantity}" is invalid`
    };
  }

  private afterValidate(validated: Validated): UpdateRecipeCompositionDTO {
    return {
      recipeId: validated.recipeId.value,
      alimentMeasureId: validated.measureId.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<UpdateRecipeCompositionDTO> {
    return Object.freeze(this.toUpdate);
  }
}
