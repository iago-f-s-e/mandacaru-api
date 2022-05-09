import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSubjectDTO } from '@src/modules/app/subject/useCases/create-subject/dtos';
import { CreateSubjectRepository } from '@src/modules/app/subject/useCases/create-subject/repository';
import { FindSubjectRepository } from '@src/modules/app/subject/useCases/find-subject/repository';
import { UpdateSubjectRepository } from '@src/modules/app/subject/useCases/update-subject/repository';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types/responses';
import { Subject } from '@src/modules/database/entities';
import { UpdateResult } from 'typeorm';

@Injectable()
export class CreateUserSubjectService {
  constructor(
    private readonly createSubject: CreateSubjectRepository,
    private readonly findSubject: FindSubjectRepository,
    private readonly updateSubject: UpdateSubjectRepository
  ) {}

  private errorMessage(data: CreateSubjectDTO): string {
    return `The email "${data.email}"  already exists`;
  }

  private insert(data: CreateSubjectDTO): Promise<Subject> {
    return this.createSubject.exec(data);
  }

  private async reactive(id: string): Promise<UpdateResult> {
    return this.updateSubject.reactive(id);
  }

  public async exec(data: CreateSubjectDTO): CreateResponse<Subject> {
    const found = await this.findSubject.existing(data.name, data.userId);

    if (!found) return right(await this.insert(data));

    if (found.isActive) return left(new ConflictException(this.errorMessage(data)));

    await this.reactive(found.id);

    return right(found);
  }
}
