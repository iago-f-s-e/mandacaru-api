import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeComposition } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateRecipeCompositionDTO } from '../dtos';

@Injectable()
export class UpdateRecipeCompositionRepository {
  constructor(
    @InjectRepository(RecipeComposition)
    private readonly compositionNutrient: Repository<RecipeComposition>
  ) {}

  public exec(data: UpdateRecipeCompositionDTO): Promise<UpdateResult> {
    return this.compositionNutrient.update(
      { recipeId: data.recipeId, alimentMeasureId: data.alimentMeasureId },
      data
    );
  }
}
