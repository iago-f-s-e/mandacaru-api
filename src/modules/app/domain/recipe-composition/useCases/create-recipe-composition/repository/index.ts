import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeComposition } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateRecipeCompositionDTO } from '../dtos';

type Data = CreateRecipeCompositionDTO & { recipeId: string };
@Injectable()
export class CreateRecipeCompositionRepository {
  constructor(
    @InjectRepository(RecipeComposition)
    private readonly compositionNutrient: Repository<RecipeComposition>
  ) {}

  public exec(data: Data[]): Promise<RecipeComposition[]> {
    return this.compositionNutrient.save(data);
  }
}
