import { RecipeToClientDTO } from '../dtos';

export type GetRecipe = Promise<RecipeToClientDTO | RecipeToClientDTO[]>;
