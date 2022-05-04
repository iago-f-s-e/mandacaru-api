import { ValidateToCreateCompositionNutrient } from '@src/modules/app/domain/composition-nutrient/useCases/create-composition-nutrient/entity';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { CompositionDTO } from '../../../dtos';
import { CreateCompositionDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateComposition {
  private readonly toCreate: CreateCompositionDTO;
  protected referenceIdOrError!: ValidateResponse<ValidateUUID>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: CompositionDTO) {
    this.set(data);

    this.assert(this.referenceIdOrError, this.quantityOrError);

    const referenceId = this.referenceIdOrError.value;
    const quantity = this.quantityOrError.value;

    const nutrients = data.nutrients.map(
      nutrient => new ValidateToCreateCompositionNutrient(nutrient).value
    );

    this.toCreate = this.afterAssert({ referenceId, quantity, nutrients });
  }

  private set(data: CompositionDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.referenceIdOrError = ValidateUUID.exec(data.reference?.id, {
      errorMessage: errorMessage.referenceId
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

  private getErrorMessage(data: CompositionDTO): Errors {
    return {
      referenceId: `The composition reference id "${data.reference?.id}" is invalid`,
      quantity: `The composition quantity "${data.quantity}" is invalid`
    };
  }

  private afterAssert(validated: Validated): CreateCompositionDTO {
    return {
      nutrients: validated.nutrients,
      referenceId: validated.referenceId.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<CreateCompositionDTO> {
    return Object.freeze(this.toCreate);
  }
}
