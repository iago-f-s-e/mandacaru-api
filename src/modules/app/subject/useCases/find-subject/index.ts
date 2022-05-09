import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '@src/modules/database/entities';
import { FindSubjectRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  exports: [FindSubjectRepository],
  providers: [FindSubjectRepository]
})
export class FindSubjectModule {}
