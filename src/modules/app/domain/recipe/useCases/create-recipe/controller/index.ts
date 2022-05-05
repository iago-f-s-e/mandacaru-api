import { Body, Controller, Post } from '@nestjs/common';
import { Recipe } from '@src/modules/database/entities';
import { RecipeDTO } from '../../../dtos';
import { ValidateToCreateRecipe } from '../entity';
import { CreateRecipeService } from '../service';

@Controller()
export class CreateRecipeController {
  constructor(private readonly createService: CreateRecipeService) {}

  @Post()
  public async exec(@Body() body: RecipeDTO): Promise<Recipe> {
    const recipe = new ValidateToCreateRecipe(body);

    const createOrError = await this.createService.exec(recipe.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
