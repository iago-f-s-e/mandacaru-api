import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRecipeCompositionDTO } from '@src/modules/app/domain/recipe-composition/useCases/update-recipe-composition/dtos';
import { UpdateRecipeCompositionService } from '@src/modules/app/domain/recipe-composition/useCases/update-recipe-composition/service';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';
import { Recipe } from '@src/modules/database/entities';
import { FindRecipeRepository } from '../../find-recipe/repository';
import { UpdateRecipeDTO } from '../dtos';
import { UpdateRecipeRepository } from '../repository';

type Errors = {
  conflict: string;
  notFound: string;
};

@Injectable()
export class UpdateRecipeService {
  constructor(
    private readonly findRecipe: FindRecipeRepository,
    private readonly updateRecipe: UpdateRecipeRepository,
    private readonly updateRecipeComposition: UpdateRecipeCompositionService
  ) {}

  private async updateCompositions(
    data: UpdateRecipeCompositionDTO[],
    originalRecipe: Recipe
  ): Promise<void> {
    return this.updateRecipeComposition.exec(data, originalRecipe);
  }

  private errorMessage(data: UpdateRecipeDTO): Errors {
    return {
      conflict: `The name "${data.name}" already exists`,
      notFound: 'Aliment is not found'
    };
  }
  public async exec(data: UpdateRecipeDTO): UpdateResponse<UpdateRecipeDTO> {
    const error = this.errorMessage(data);

    const [original, existing] = await Promise.all([
      this.findRecipe.byId(data.id),
      this.findRecipe.existing(data.name, data.referenceId)
    ]);

    if (!original) return left(new NotFoundException(error.notFound));

    if (!!existing && existing.id !== data.id) return left(new ConflictException(error.conflict));

    const { compositions, ...composition } = data;

    await this.updateCompositions(compositions, original);
    await this.updateRecipe.exec(composition);

    return right(data);
  }
}
