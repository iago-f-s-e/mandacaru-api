import { ConflictException, NotFoundException } from '@nestjs/common';
import { Either } from '../../either';

export type UpdateResponse<T> = Promise<Either<NotFoundException | ConflictException, T>>;
