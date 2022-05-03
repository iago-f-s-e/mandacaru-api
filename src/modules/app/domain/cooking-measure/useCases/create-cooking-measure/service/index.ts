import { ConflictException, Injectable } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types/responses';
import { CookingMeasure } from '@src/modules/database/entities';
import { UpdateResult } from 'typeorm';
import { FindCookingMeasureRepository } from '../../find-cooking-measure/repository';
import { UpdateCookingMeasureRepository } from '../../update-cooking-measure/repository';
import { CreateCookingMeasureDTO } from '../dtos';
import { CreateCookingMeasureRepository } from '../repository';

@Injectable()
export class CreateCookingMeasureService {
  constructor(
    private readonly createCookingMeasure: CreateCookingMeasureRepository,
    private readonly findCookingMeasure: FindCookingMeasureRepository,
    private readonly updateCookingMeasure: UpdateCookingMeasureRepository
  ) {}

  private insert(data: CreateCookingMeasureDTO): Promise<CookingMeasure> {
    return this.createCookingMeasure.exec(data);
  }

  private reactive(data: CookingMeasure): Promise<UpdateResult> {
    return this.updateCookingMeasure.reactive(data.id);
  }

  private errorMessage(data: CreateCookingMeasureDTO): string {
    return `The name "${data.name}" already exists`;
  }

  public async exec(data: CreateCookingMeasureDTO): CreateResponse<CookingMeasure> {
    const existing = await this.findCookingMeasure.existing(data.name);

    if (!existing) return right(await this.insert(data));

    if (existing.isActive) return left(new ConflictException(this.errorMessage(data)));

    await this.reactive(existing);

    return right(existing);
  }
}
