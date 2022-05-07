import { ValidateToUpdateAddress } from '@src/modules/app/address/useCases/update-address/entity';
import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { UserDTO } from '../../../dtos';
import { ValidateUserRole } from '../../../validators';
import { UpdateUserDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateUser {
  private readonly toUpdate: UpdateUserDTO;
  protected idOrError!: ValidateResponse<ValidateUUID>;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected surnameOrError!: ValidateResponse<ValidateString>;
  protected roleOrError!: ValidateResponse<ValidateUserRole>;

  constructor(data: UserDTO) {
    this.set(data);

    this.assert(this.idOrError, this.nameOrError, this.surnameOrError, this.roleOrError);

    const id = this.idOrError.value;
    const name = this.nameOrError.value;
    const surname = this.surnameOrError.value;
    const role = this.roleOrError.value;
    const address = data.address
      ? new ValidateToUpdateAddress({ ...data.address, userId: data.id }).value
      : undefined;

    this.toUpdate = this.afterValidate({ name, surname, id, role, address });
  }

  private set(data: UserDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.idOrError = ValidateUUID.exec(data.id, { errorMessage: errorMessage.id });

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.NAME },
      { errorMessage: errorMessage.name }
    );

    this.surnameOrError = ValidateString.exec(
      data.surname,
      { isOptional: false, maxSize: maxSize.SURNAME },
      { errorMessage: errorMessage.surname }
    );

    this.roleOrError = ValidateUserRole.exec(data.role, { errorMessage: errorMessage.role });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: UserDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`,
      surname: `The surname "${data.surname}" is invalid`,
      id: `The id "${data.id}" is invalid`,
      role: `The role "${data.role}" is invalid`
    };
  }

  private afterValidate(validated: Validated): UpdateUserDTO {
    return {
      id: validated.id.value,
      name: validated.name.value.toUpperCase(),
      surname: validated.surname.value.toUpperCase(),
      role: validated.role.value,
      address: validated.address
    };
  }

  public get value(): Readonly<UpdateUserDTO> {
    return Object.freeze(this.toUpdate);
  }
}
