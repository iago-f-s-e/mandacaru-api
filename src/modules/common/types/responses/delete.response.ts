import { NotFoundException } from '@nestjs/common';
import { Either } from '../../either';

export type DeleteResponse<T = null> = Promise<Either<NotFoundException, T>>;
