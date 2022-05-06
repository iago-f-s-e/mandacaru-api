import { CompositionDTO } from '../../composition/dtos';

export type AlimentDTO = {
  id: string;
  name: string;
  composition: CompositionDTO;
};
