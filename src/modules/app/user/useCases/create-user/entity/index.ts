import { maxSize, minSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateDocument, ValidateEmail, ValidateString } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { UserDTO } from '../../../dtos';
import { ValidateUserRole } from '../../../validators';
import { CreateUserDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateUser {
  private readonly toCreate: CreateUserDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected surnameOrError!: ValidateResponse<ValidateString>;
  protected emailOrError!: ValidateResponse<ValidateEmail>;
  protected passwordOrError!: ValidateResponse<ValidateString>;
  protected roleOrError!: ValidateResponse<ValidateUserRole>;
  protected documentOrError!: ValidateResponse<ValidateDocument>;

  constructor(data: UserDTO) {
    this.set(data);

    this.assert(
      this.nameOrError,
      this.surnameOrError,
      this.emailOrError,
      this.passwordOrError,
      this.roleOrError,
      this.documentOrError
    );

    const name = this.nameOrError.value;
    const surname = this.surnameOrError.value;
    const email = this.emailOrError.value;
    const password = this.passwordOrError.value;
    const role = this.roleOrError.value;
    const document = this.documentOrError.value;

    this.toCreate = this.afterValidate({ name, surname, email, password, role, document });
  }

  private set(data: UserDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

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

    this.emailOrError = ValidateEmail.exec(
      data.email,
      { maxSize: maxSize.EMAIL },
      { errorMessage: errorMessage.email }
    );

    this.passwordOrError = ValidateString.exec(
      data.password,
      { isOptional: false, maxSize: maxSize.PASSWORD, minSize: minSize.PASSWORD },
      { errorMessage: errorMessage.password }
    );

    this.roleOrError = ValidateUserRole.exec(data.role, { errorMessage: errorMessage.role });

    this.documentOrError = ValidateDocument.exec(data.cpf, { errorMessage: errorMessage.document });
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
      email: `The email "${data.email}" is invalid`,
      password: `The password "${data.password}" is invalid`,
      role: `The role "${data.role}" is invalid`,
      document: `The cpf "${data.cpf}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateUserDTO {
    return {
      name: validated.name.value.toUpperCase(),
      surname: validated.surname.value.toUpperCase(),
      email: validated.email.value.toLowerCase(),
      password: validated.password.value,
      role: validated.role.value,
      document: validated.document.value
    };
  }

  public get value(): Readonly<CreateUserDTO> {
    return Object.freeze(this.toCreate);
  }
}
