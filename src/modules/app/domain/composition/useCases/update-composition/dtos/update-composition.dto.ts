import { UpdateCompositionNutrientDTO } from '@src/modules/app/domain/composition-nutrient/useCases/update-composition-nutrient/dtos/update-composition-nutrient.dto';

export type UpdateCompositionDTO = {
  id: string;
  referenceId: string;
  quantity: number;
  nutrients: UpdateCompositionNutrientDTO[];
};
