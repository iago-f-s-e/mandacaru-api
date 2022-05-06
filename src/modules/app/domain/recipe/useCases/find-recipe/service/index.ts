import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { FindResponse } from '@src/modules/common/types/responses';
import { Recipe } from '@src/modules/database/entities';
import { RecipeToClientDTO } from '../../../dtos';
import { ListRecipeDTO } from '../dtos';
import { FindRecipeRepository } from '../repository';

@Injectable()
export class FindRecipeService {
  constructor(private readonly findRecipe: FindRecipeRepository) {}

  private errorMessage(): string {
    return 'Recipe is not found';
  }

  private toClient(data: Recipe): RecipeToClientDTO {
    return {
      ...data,
      compositions: data.compositions?.map(composition => ({
        alimentId: composition.alimentMeasure.aliment.id,
        measureId: composition.alimentMeasure.id,
        quantity: composition.quantity
      }))
    };
  }

  public async byId(id: string): FindResponse<RecipeToClientDTO> {
    const recipe = await this.findRecipe.byId(id);

    if (!recipe) return left(new NotFoundException(this.errorMessage()));

    return right(this.toClient(recipe));
  }

  public async exec(filter: ListRecipeDTO): Promise<RecipeToClientDTO[]> {
    return (await this.findRecipe.exec(filter)).map(data => this.toClient(data));
  }
}
