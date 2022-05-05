import { ConflictException, Injectable } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types/responses';
import { Recipe } from '@src/modules/database/entities';
import { FindRecipeRepository } from '../../find-recipe/repository';
import { UpdateRecipeRepository } from '../../update-recipe/repository';
import { CreateRecipeDTO } from '../dtos';
import { CreateRecipeRepository } from '../repository';

@Injectable()
export class CreateRecipeService {
  constructor(
    private readonly createRecipe: CreateRecipeRepository,
    private readonly findRecipe: FindRecipeRepository,
    private readonly updateRecipe: UpdateRecipeRepository
  ) {}

  private insert(data: CreateRecipeDTO): Promise<Recipe> {
    return this.createRecipe.exec(data);
  }

  private errorMessage(data: CreateRecipeDTO): string {
    return `The name "${data.name}" already exists`;
  }

  public async exec(data: CreateRecipeDTO): CreateResponse<Recipe> {
    const existing = await this.findRecipe.existing(data.name, data.referenceId);

    if (!existing) return right(await this.insert(data));

    if (existing.isActive) return left(new ConflictException(this.errorMessage(data)));

    await this.updateRecipe.reactive(existing.id);

    return right(existing);
  }
}
