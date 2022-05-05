import { UpdateCompositionDTO } from '@src/modules/app/domain/composition/useCases/update-composition/dtos';

export type UpdateAlimentDTO = {
  id: string;
  name: string;
  composition: UpdateCompositionDTO;
};
