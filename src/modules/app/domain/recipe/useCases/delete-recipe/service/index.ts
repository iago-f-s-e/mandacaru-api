import { Injectable } from '@nestjs/common';
import { UpdateRecipeRepository } from '../../update-recipe/repository';

@Injectable()
export class DeleteRecipeService {
  constructor(private readonly updateRecipe: UpdateRecipeRepository) {}

  public async exec(id: string): Promise<void> {
    await this.updateRecipe.inactive(id);
  }
}
