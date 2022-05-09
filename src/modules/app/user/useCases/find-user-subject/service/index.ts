import { Injectable, NotFoundException } from '@nestjs/common';
import { ListSubject } from '@src/modules/app/subject/useCases/find-subject/dtos';
import { FindSubjectRepository } from '@src/modules/app/subject/useCases/find-subject/repository';
import { left, right } from '@src/modules/common/either';
import { FindResponse } from '@src/modules/common/types/responses';
import { Subject } from '@src/modules/database/entities';

@Injectable()
export class FindUserSubjectService {
  constructor(private readonly findSubject: FindSubjectRepository) {}

  private errorMessage(): string {
    return 'Subject is not found';
  }

  public async byId(id: string, userId: string): FindResponse<Subject> {
    const subject = await this.findSubject.byId(id, userId);

    if (!subject) return left(new NotFoundException(this.errorMessage()));

    return right(subject);
  }

  public exec(userId: string, filter: ListSubject): Promise<Subject[]> {
    return this.findSubject.exec(userId, filter);
  }
}
