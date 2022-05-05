import { Injectable } from '@nestjs/common';
import { Recipe, RecipeComposition } from '@src/modules/database/entities';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateRecipeCompositionRepository } from '../../create-recipe-composition/repository';
import { DeleteRecipeCompositionRepository } from '../../delete-recipe-composition/repository';
import { UpdateRecipeCompositionRepository } from '../repository';
import { UpdateRecipeCompositionDTO } from '../dtos';

type Filter = {
  toCreate: UpdateRecipeCompositionDTO[];
  toDelete: RecipeComposition[];
  toUpdate: UpdateRecipeCompositionDTO[];
};

@Injectable()
export class UpdateRecipeCompositionService {
  constructor(
    private readonly createRecipeComposition: CreateRecipeCompositionRepository,
    private readonly deleteRecipeComposition: DeleteRecipeCompositionRepository,
    private readonly updateRecipeComposition: UpdateRecipeCompositionRepository
  ) {}

  private filter(data: UpdateRecipeCompositionDTO[], recipe: Recipe): Filter {
    let toDelete = recipe.compositions;
    const toUpdate: UpdateRecipeCompositionDTO[] = [];
    const toCreate: UpdateRecipeCompositionDTO[] = [];

    while (data.length > 0) {
      const composition = data.pop();

      if (!composition) break;

      const matchComposition = toDelete.find(
        ({ alimentMeasure }) => alimentMeasure.id === composition.alimentMeasureId
      );

      if (!matchComposition) {
        toCreate.push(composition);

        continue;
      }

      toUpdate.push(composition);

      toDelete = toDelete.filter(
        ({ alimentMeasure }) => alimentMeasure.id !== composition.alimentMeasureId
      );
    }

    return { toCreate, toDelete, toUpdate };
  }

  private create(data: UpdateRecipeCompositionDTO[]): Promise<RecipeComposition[]> {
    return this.createRecipeComposition.exec(data);
  }

  private delete(data: RecipeComposition[]): Promise<DeleteResult>[] {
    return data.map(({ recipeId, alimentMeasure }) =>
      this.deleteRecipeComposition.exec(recipeId, alimentMeasure.id)
    );
  }

  private update(data: UpdateRecipeCompositionDTO[]): Promise<UpdateResult>[] {
    return data.map(toUpdate => this.updateRecipeComposition.exec(toUpdate));
  }

  public async exec(data: UpdateRecipeCompositionDTO[], recipe: Recipe): Promise<void> {
    const { toCreate, toDelete, toUpdate } = this.filter(data, recipe);

    await Promise.all([this.create(toCreate), this.delete(toDelete), this.update(toUpdate)]);
  }
}
