import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateSubjectDTO } from '../dtos';

@Injectable()
export class CreateSubjectRepository {
  constructor(@InjectRepository(Subject) private readonly subject: Repository<Subject>) {}

  public exec(data: CreateSubjectDTO): Promise<Subject> {
    return this.subject.save(this.subject.create(data));
  }
}
