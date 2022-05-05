import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompositionNutrient } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateCompositionNutrientDTO } from '../dtos';

@Injectable()
export class UpdateCompositionNutrientRepository {
  constructor(
    @InjectRepository(CompositionNutrient)
    private readonly compositionNutrient: Repository<CompositionNutrient>
  ) {}

  public exec(data: UpdateCompositionNutrientDTO): Promise<UpdateResult> {
    return this.compositionNutrient.update(
      { compositionId: data.compositionId, nutrientId: data.nutrientId },
      data
    );
  }
}
