import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { FindResponse } from '@src/modules/common/types/responses';
import { Recipe } from '@src/modules/database/entities';
import { FindRecipeRepository } from '../repository';

@Injectable()
export class FindRecipeService {
  constructor(private readonly findRecipe: FindRecipeRepository) {}

  private errorMessage(): string {
    return 'Recipe is not found';
  }

  public async byId(id: string): FindResponse<Recipe> {
    const recipe = await this.findRecipe.byId(id);

    if (!recipe) return left(new NotFoundException(this.errorMessage()));

    return right(recipe);
  }

  public exec(): Promise<Recipe[]> {
    return this.findRecipe.exec();
  }
}
