import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Recipe } from '@src/modules/database/entities';
import { FindRecipeService } from '../service';

@Controller()
export class FindRecipeController {
  constructor(private readonly findService: FindRecipeService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): Promise<Recipe> {
    const recipeOrError = await this.findService.byId(id);

    if (recipeOrError.isLeft()) throw recipeOrError.value;

    return recipeOrError.value;
  }

  @Get()
  public exec(): Promise<Recipe[]> {
    return this.findService.exec();
  }
}
