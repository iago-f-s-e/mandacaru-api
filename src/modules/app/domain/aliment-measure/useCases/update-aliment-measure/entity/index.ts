import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { AlimentMeasureDTO } from '../../../dtos';
import { UpdateAlimentMeasureDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateAlimentMeasure {
  private readonly toUpdate: UpdateAlimentMeasureDTO;
  protected idOrError!: ValidateResponse<ValidateUUID>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: AlimentMeasureDTO) {
    this.set(data);

    this.assert(this.idOrError, this.quantityOrError);

    const id = this.idOrError.value;
    const quantity = this.quantityOrError.value;

    this.toUpdate = this.afterAssert({ id, quantity });
  }

  private set(data: AlimentMeasureDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.idOrError = ValidateUUID.exec(data.id, {
      errorMessage: errorMessage.id
    });
    this.quantityOrError = ValidateNumber.exec(
      data.quantity,
      {
        isOptional: false
      },
      {
        errorMessage: errorMessage.quantity
      }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: AlimentMeasureDTO): Errors {
    return {
      id: `The aliment measure id "${data.id}" is invalid`,
      quantity: `The quantity "${data.quantity}" is invalid`
    };
  }

  private afterAssert(validated: Validated): UpdateAlimentMeasureDTO {
    return {
      id: validated.id.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<UpdateAlimentMeasureDTO> {
    return Object.freeze(this.toUpdate);
  }
}
