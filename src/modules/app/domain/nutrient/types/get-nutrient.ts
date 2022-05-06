import { Nutrient } from '@src/modules/database/entities';

export type GetNutrient = Promise<Nutrient | Nutrient[]>;
