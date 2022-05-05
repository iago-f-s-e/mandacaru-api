import { RecipeCompositionDTO } from '../../recipe-composition/dtos';

export type RecipeDTO = {
  id: string;
  name: string;
  gram: string;
  referenceId: string;
  preparationMethod: string;
  compositions: RecipeCompositionDTO[];
};
