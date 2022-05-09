import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { iLikeGenerator } from '@src/modules/common/utils';
import { Subject } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { ListSubject } from '../dtos';

@Injectable()
export class FindSubjectRepository {
  constructor(@InjectRepository(Subject) private readonly subject: Repository<Subject>) {}

  public existing(email: string, userId: string): Promise<Subject | null> {
    return this.subject.findOne({
      where: { email, userId },
      select: { id: true, isActive: true }
    });
  }

  public byId(id: string, userId: string): Promise<Subject | null> {
    return this.subject
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.address', 'address')
      .where('subject.id = :id', { id })
      .andWhere('subject.userId = :userId', { userId })
      .andWhere('subject.isActive = true')
      .getOne();
  }

  public exec(userId: string, filter: ListSubject): Promise<Subject[]> {
    const ilike = iLikeGenerator(filter, 'subject');

    return this.subject
      .createQueryBuilder('subject')
      .where('subject.userId = :userId', { userId })
      .andWhere('subject.isActive = true')
      .andWhere(ilike.query, ilike.params)
      .orderBy('subject.name')
      .getMany();
  }
}
