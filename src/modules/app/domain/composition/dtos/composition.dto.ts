import { CompositionNutrientDTO } from '../../composition-nutrient/dtos';

export type CompositionDTO = {
  id: string;
  quantity: string;
  reference: { id: string };
  nutrients: CompositionNutrientDTO[];
};
