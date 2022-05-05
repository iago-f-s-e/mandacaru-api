import { ValidateToUpdateCompositionNutrient } from '@src/modules/app/domain/composition-nutrient/useCases/update-composition-nutrient/entity';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { CompositionDTO } from '../../../dtos';
import { UpdateCompositionDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateComposition {
  private readonly toUpdate: UpdateCompositionDTO;
  protected idOrError!: ValidateResponse<ValidateUUID>;
  protected referenceIdOrError!: ValidateResponse<ValidateUUID>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: CompositionDTO) {
    this.set(data);

    this.assert(this.idOrError, this.referenceIdOrError, this.quantityOrError);

    const id = this.idOrError.value;
    const referenceId = this.referenceIdOrError.value;
    const quantity = this.quantityOrError.value;

    const nutrients = data.nutrients.map(
      nutrient =>
        new ValidateToUpdateCompositionNutrient({ ...nutrient, compositionId: data.id }).value
    );

    this.toUpdate = this.afterAssert({ id, referenceId, quantity, nutrients });
  }

  private set(data: CompositionDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.idOrError = ValidateUUID.exec(data.id, {
      errorMessage: errorMessage.id
    });

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
      id: `The composition id "${data.id}" is invalid`,
      referenceId: `The composition reference id "${data.reference?.id}" is invalid`,
      quantity: `The composition quantity "${data.quantity}" is invalid`
    };
  }

  private afterAssert(validated: Validated): UpdateCompositionDTO {
    return {
      id: validated.id.value,
      nutrients: validated.nutrients,
      referenceId: validated.referenceId.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<UpdateCompositionDTO> {
    return Object.freeze(this.toUpdate);
  }
}
