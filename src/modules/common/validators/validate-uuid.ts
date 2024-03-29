import { BadRequestException } from '@nestjs/common';
import { left, right } from '../either';
import { ValidateResponse } from '../types/responses';
import { OnError } from './types';
import { validate } from 'uuid';

export class ValidateUUID {
  private readonly data: Readonly<string>;

  private constructor(data: string) {
    this.data = data;
    Object.freeze(this);
  }

  public static exec(data: string, onError: OnError): ValidateResponse<ValidateUUID> {
    if (!this.isValid(data)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateUUID(data));
  }

  private static isValid(id: string): boolean {
    return validate(id);
  }

  public get value(): Readonly<string> {
    return this.data;
  }
}
