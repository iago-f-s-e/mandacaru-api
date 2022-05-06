import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GetRecipe } from '../../../types';
import { ListRecipeDTO } from '../dtos';
import { FindRecipeService } from '../service';

@Controller()
export class FindRecipeController {
  constructor(private readonly findService: FindRecipeService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): GetRecipe {
    const recipeOrError = await this.findService.byId(id);

    if (recipeOrError.isLeft()) throw recipeOrError.value;

    return recipeOrError.value;
  }

  @Get()
  public exec(@Query() filter: ListRecipeDTO): GetRecipe {
    return this.findService.exec(filter);
  }
}
