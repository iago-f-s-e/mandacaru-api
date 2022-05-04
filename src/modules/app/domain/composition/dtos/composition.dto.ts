import { CompositionNutrientDTO } from '../../composition-nutrient/dtos';

export type CompositionDTO = {
  quantity: string;
  reference: { id: string };
  nutrients: CompositionNutrientDTO[];
};
