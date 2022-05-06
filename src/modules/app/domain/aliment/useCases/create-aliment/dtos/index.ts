import { CreateCompositionDTO } from '@src/modules/app/domain/composition/useCases/create-composition/dtos';

export type CreateAlimentDTO = {
  name: string;
  composition: CreateCompositionDTO;
};
