import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeComposition } from '@src/modules/database/entities';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class DeleteRecipeCompositionRepository {
  constructor(
    @InjectRepository(RecipeComposition)
    private readonly compositionNutrient: Repository<RecipeComposition>
  ) {}

  public exec(recipeId: string, alimentMeasureId: string): Promise<DeleteResult> {
    return this.compositionNutrient.delete({ recipeId, alimentMeasureId });
  }
}
