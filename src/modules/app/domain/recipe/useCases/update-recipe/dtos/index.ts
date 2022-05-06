import { UpdateRecipeCompositionDTO } from '@src/modules/app/domain/recipe-composition/useCases/update-recipe-composition/dtos';

export type UpdateRecipeDTO = {
  id: string;
  name: string;
  gram: number;
  referenceId: string;
  preparationMethod: string;
  compositions: UpdateRecipeCompositionDTO[];
};
