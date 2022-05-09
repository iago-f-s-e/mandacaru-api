import { SubjectToClientDTO } from '../../subject/dtos';

export type GetUserSubject = Promise<SubjectToClientDTO | SubjectToClientDTO[]>;
