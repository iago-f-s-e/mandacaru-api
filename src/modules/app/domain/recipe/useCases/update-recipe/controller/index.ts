import { Body, Controller, Param, Put } from '@nestjs/common';
import { RecipeDTO } from '../../../dtos';
import { UpdateRecipeDTO } from '../dtos';
import { ValidateToUpdateRecipe } from '../entity';
import { UpdateRecipeService } from '../service';

@Controller()
export class UpdateRecipeController {
  constructor(private readonly updateService: UpdateRecipeService) {}

  @Put(':id')
  public async exec(@Param('id') id: string, @Body() body: RecipeDTO): Promise<UpdateRecipeDTO> {
    const recipe = new ValidateToUpdateRecipe({ ...body, id });

    const updateOrError = await this.updateService.exec(recipe.value);

    if (updateOrError.isLeft()) throw updateOrError.value;

    return updateOrError.value;
  }
}
