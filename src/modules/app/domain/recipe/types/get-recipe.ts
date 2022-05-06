import { RecipeToClientDTO } from '../useCases/find-recipe/dtos';

export type GetRecipe = Promise<RecipeToClientDTO | RecipeToClientDTO[]>;
