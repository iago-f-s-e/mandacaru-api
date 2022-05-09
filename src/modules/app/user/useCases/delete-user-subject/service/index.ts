import { Injectable } from '@nestjs/common';
import { UpdateSubjectRepository } from '@src/modules/app/subject/useCases/update-subject/repository';

@Injectable()
export class DeleteUserSubjectService {
  constructor(private readonly updateSubject: UpdateSubjectRepository) {}

  public async exec(id: string): Promise<void> {
    await this.updateSubject.inactive(id);
  }
}
