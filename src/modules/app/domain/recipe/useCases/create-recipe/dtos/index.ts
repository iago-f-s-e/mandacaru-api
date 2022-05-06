import { CreateRecipeCompositionDTO } from '@src/modules/app/domain/recipe-composition/useCases/create-recipe-composition/dtos';

export type CreateRecipeDTO = {
  name: string;
  gram: number;
  referenceId: string;
  preparationMethod: string;
  compositions: CreateRecipeCompositionDTO[];
};
