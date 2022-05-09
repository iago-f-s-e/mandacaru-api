import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateSubjectDTO } from '../dtos';

@Injectable()
export class UpdateSubjectRepository {
  constructor(@InjectRepository(Subject) private readonly subject: Repository<Subject>) {}

  public inactive(id: string): Promise<UpdateResult> {
    return this.subject.update({ id }, { isActive: false });
  }

  public reactive(id: string): Promise<UpdateResult> {
    return this.subject.update({ id }, { isActive: true });
  }

  public exec(data: Omit<UpdateSubjectDTO, 'address'>): Promise<UpdateResult> {
    return this.subject.update({ id: data.id }, data);
  }
}
