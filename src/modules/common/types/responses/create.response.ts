import { ConflictException } from '@nestjs/common';
import { Either } from '../../either';

export type CreateResponse<T> = Promise<Either<ConflictException, T>>;
