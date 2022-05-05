import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { AlimentMeasureDTO } from '../../../dtos';
import { CreateAlimentMeasureDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateAlimentMeasure {
  private readonly toCreate: CreateAlimentMeasureDTO;
  protected alimentIdOrError!: ValidateResponse<ValidateUUID>;
  protected measureIdOrError!: ValidateResponse<ValidateUUID>;
  protected referenceIdOrError!: ValidateResponse<ValidateUUID>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: AlimentMeasureDTO) {
    this.set(data);

    this.assert(
      this.alimentIdOrError,
      this.measureIdOrError,
      this.referenceIdOrError,
      this.quantityOrError
    );

    const alimentId = this.alimentIdOrError.value;
    const measureId = this.measureIdOrError.value;
    const referenceId = this.referenceIdOrError.value;
    const quantity = this.quantityOrError.value;

    this.toCreate = this.afterAssert({ alimentId, measureId, referenceId, quantity });
  }

  private set(data: AlimentMeasureDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.alimentIdOrError = ValidateUUID.exec(data.alimentId, {
      errorMessage: errorMessage.alimentId
    });

    this.referenceIdOrError = ValidateUUID.exec(data.referenceId, {
      errorMessage: errorMessage.referenceId
    });

    this.measureIdOrError = ValidateUUID.exec(data.measureId, {
      errorMessage: errorMessage.measureId
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
      alimentId: `The aliment id "${data.alimentId}" is invalid`,
      referenceId: `The reference id "${data.referenceId}" is invalid`,
      measureId: `The measure id "${data.measureId}" is invalid`,
      quantity: `The quantity "${data.quantity}" is invalid`
    };
  }

  private afterAssert(validated: Validated): CreateAlimentMeasureDTO {
    return {
      alimentId: validated.alimentId.value,
      referenceId: validated.referenceId.value,
      measureId: validated.measureId.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<CreateAlimentMeasureDTO> {
    return Object.freeze(this.toCreate);
  }
}
