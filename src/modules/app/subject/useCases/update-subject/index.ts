import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '@src/modules/database/entities';
import { UpdateSubjectRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  exports: [UpdateSubjectRepository],
  providers: [UpdateSubjectRepository]
})
export class UpdateSubjectModule {}
