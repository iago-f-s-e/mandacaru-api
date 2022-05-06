import { CreateCompositionNutrientDTO } from '@src/modules/app/domain/composition-nutrient/useCases/create-composition-nutrient/dtos';

export type CreateCompositionDTO = {
  referenceId: string;
  quantity: number;
  nutrients: CreateCompositionNutrientDTO[];
};
