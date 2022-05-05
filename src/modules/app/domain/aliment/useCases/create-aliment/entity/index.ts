import { ValidateToCreateComposition } from '@src/modules/app/domain/composition/useCases/create-composition/entity';
import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { AlimentDTO } from '../../../dtos';
import { CreateAlimentDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateAliment {
  private readonly toCreate: CreateAlimentDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;

  constructor(data: AlimentDTO) {
    this.set(data);

    this.assert(this.nameOrError);

    const name = this.nameOrError.value;

    const composition = new ValidateToCreateComposition(data.composition).value;

    this.toCreate = this.afterAssert({ name, composition });
  }

  private set(data: AlimentDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.nameOrError = ValidateString.exec(
      data.name,
      {
        isOptional: false,
        maxSize: maxSize.ALIMENT_NAME
      },
      {
        errorMessage: errorMessage.name
      }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: AlimentDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`
    };
  }

  private afterAssert(validated: Validated): CreateAlimentDTO {
    return {
      name: validated.name.value.toUpperCase(),
      composition: validated.composition
    };
  }

  public get value(): Readonly<CreateAlimentDTO> {
    return Object.freeze(this.toCreate);
  }
}
