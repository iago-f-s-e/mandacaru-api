import { ValidateToUpdateRecipeComposition } from '@src/modules/app/domain/recipe-composition/useCases/update-recipe-composition/entity';
import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { RecipeDTO } from '../../../dtos';
import { UpdateRecipeDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateRecipe {
  private readonly toUpdate: UpdateRecipeDTO;
  protected idOrError!: ValidateResponse<ValidateUUID>;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected gramOrError!: ValidateResponse<ValidateNumber>;
  protected referenceIdOrError!: ValidateResponse<ValidateUUID>;
  protected preparationMethodOrError!: ValidateResponse<ValidateString>;

  constructor(data: RecipeDTO) {
    this.set(data);

    this.assert(
      this.idOrError,
      this.nameOrError,
      this.gramOrError,
      this.referenceIdOrError,
      this.preparationMethodOrError
    );

    const id = this.idOrError.value;
    const name = this.nameOrError.value;
    const gram = this.gramOrError.value;
    const referenceId = this.referenceIdOrError.value;
    const preparationMethod = this.preparationMethodOrError.value;

    const compositions = data.compositions.map(
      composition =>
        new ValidateToUpdateRecipeComposition({ ...composition, recipeId: data.id }).value
    );

    this.toUpdate = this.afterAssert({
      id,
      name,
      gram,
      referenceId,
      preparationMethod,
      compositions
    });
  }

  private set(data: RecipeDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.idOrError = ValidateUUID.exec(data.id, {
      errorMessage: errorMessage.id
    });

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.RECIPE_NAME },
      { errorMessage: errorMessage.name }
    );

    this.gramOrError = ValidateNumber.exec(
      data.gram,
      { isOptional: false },
      { errorMessage: errorMessage.gram }
    );

    this.referenceIdOrError = ValidateUUID.exec(data.referenceId, {
      errorMessage: errorMessage.referenceId
    });

    this.preparationMethodOrError = ValidateString.exec(
      data.preparationMethod,
      { isOptional: true, maxSize: maxSize.RECIPE_PREPARATION_METHOD },
      { errorMessage: errorMessage.preparationMethod }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: RecipeDTO): Errors {
    return {
      id: `The recipe id "${data.id}" is invalid`,
      name: `The name "${data.name}" is invalid`,
      gram: `The gram "${data.gram}" is invalid`,
      referenceId: `The composition reference id "${data.referenceId}" is invalid`,
      preparationMethod: `The preparation method "${data.preparationMethod}" is invalid`
    };
  }

  private afterAssert(validated: Validated): UpdateRecipeDTO {
    return {
      id: validated.id.value,
      name: validated.name.value.toUpperCase(),
      gram: validated.gram.value,
      referenceId: validated.referenceId.value,
      preparationMethod: validated.preparationMethod.value,
      compositions: validated.compositions
    };
  }

  public get value(): Readonly<UpdateRecipeDTO> {
    return Object.freeze(this.toUpdate);
  }
}
