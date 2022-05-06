import { Aliment } from '@src/modules/database/entities';

export type GetAliment = Promise<Aliment | Aliment[]>;
