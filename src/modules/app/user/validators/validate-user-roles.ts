import { BadRequestException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { userRoles, UserRoles } from '@src/modules/common/types/entities';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { OnError } from '@src/modules/common/validators/types';

export class ValidateUserRole {
  private readonly data: Readonly<UserRoles>;

  private constructor(data: UserRoles) {
    this.data = data;
    Object.freeze(this);
  }

  public static exec(data: UserRoles, onError: OnError): ValidateResponse<ValidateUserRole> {
    if (!this.isValid(data)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateUserRole(data));
  }

  private static isValid(data: UserRoles): boolean {
    return !!userRoles[data];
  }

  public get value(): Readonly<UserRoles> {
    return this.data;
  }
}
