import { ConflictException, Injectable } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types/responses';
import { Nutrient } from '@src/modules/database/entities';
import { UpdateResult } from 'typeorm';
import { FindNutrientRepository } from '../../find-nutrient/repository';
import { UpdateNutrientRepository } from '../../update-nutrient/repository';
import { CreateNutrientDTO } from '../dtos';
import { CreateNutrientRepository } from '../repository';

@Injectable()
export class CreateNutrientService {
  constructor(
    private readonly createNutrient: CreateNutrientRepository,
    private readonly findNutrient: FindNutrientRepository,
    private readonly updateNutrient: UpdateNutrientRepository
  ) {}

  private insert(data: CreateNutrientDTO): Promise<Nutrient> {
    return this.createNutrient.exec(data);
  }

  private reactive(data: Nutrient): Promise<UpdateResult> {
    return this.updateNutrient.reactive(data.id);
  }

  private errorMessage(data: CreateNutrientDTO): string {
    return `The name "${data.name}" already exists`;
  }

  public async exec(data: CreateNutrientDTO): CreateResponse<Nutrient> {
    const existing = await this.findNutrient.existing(data.name);

    if (!existing) return right(await this.insert(data));

    if (existing.isActive) return left(new ConflictException(this.errorMessage(data)));

    await this.reactive(existing);

    return right(existing);
  }
}
