import { ValidateToCreateRecipeComposition } from '@src/modules/app/domain/recipe-composition/useCases/create-recipe-composition/entity';
import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { RecipeDTO } from '../../../dtos';
import { CreateRecipeDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateRecipe {
  private readonly toCreate: CreateRecipeDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected gramOrError!: ValidateResponse<ValidateNumber>;
  protected referenceIdOrError!: ValidateResponse<ValidateUUID>;
  protected preparationMethodOrError!: ValidateResponse<ValidateString>;

  constructor(data: RecipeDTO) {
    this.set(data);

    this.assert(
      this.nameOrError,
      this.gramOrError,
      this.referenceIdOrError,
      this.preparationMethodOrError
    );

    const name = this.nameOrError.value;
    const gram = this.gramOrError.value;
    const referenceId = this.referenceIdOrError.value;
    const preparationMethod = this.preparationMethodOrError.value;

    const compositions = data.compositions.map(
      composition => new ValidateToCreateRecipeComposition(composition).value
    );

    this.toCreate = this.afterAssert({ name, gram, referenceId, preparationMethod, compositions });
  }

  private set(data: RecipeDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

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
      name: `The name "${data.name}" is invalid`,
      gram: `The gram "${data.gram}" is invalid`,
      referenceId: `The composition reference id "${data.referenceId}" is invalid`,
      preparationMethod: `The preparation method "${data.preparationMethod}" is invalid`
    };
  }

  private afterAssert(validated: Validated): CreateRecipeDTO {
    return {
      name: validated.name.value.toUpperCase(),
      gram: validated.gram.value,
      referenceId: validated.referenceId.value,
      preparationMethod: validated.preparationMethod.value,
      compositions: validated.compositions
    };
  }

  public get value(): Readonly<CreateRecipeDTO> {
    return Object.freeze(this.toCreate);
  }
}
