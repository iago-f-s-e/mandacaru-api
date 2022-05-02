import { NotFoundException } from '@nestjs/common';
import { Either } from '../../either';

export type FindResponse<T> = Promise<Either<NotFoundException, T>>;
