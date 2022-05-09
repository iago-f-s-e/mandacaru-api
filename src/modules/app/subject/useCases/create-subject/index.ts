import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '@src/modules/database/entities';
import { CreateSubjectRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  exports: [CreateSubjectRepository],
  providers: [CreateSubjectRepository]
})
export class CreateSubjectModule {}
