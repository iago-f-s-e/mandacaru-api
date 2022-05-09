import { Subject } from '@src/modules/database/entities';
import { addressToClient } from '../../address/helpers';
import { SubjectToClientDTO } from '../dtos';

export function subjectToClient(data: Subject): SubjectToClientDTO {
  return {
    id: data.id,
    userId: data.userId,
    name: data.name,
    surname: data.surname,
    email: data.email,
    birthdate: new Intl.DateTimeFormat('pt-BR').format(new Date(data.birthdate)),
    gender: data.gender,
    circumference: data.circumference,
    height: data.height,
    weight: data.weight,
    address: data.address?.length ? addressToClient(data.address[0]) : undefined
  };
}
