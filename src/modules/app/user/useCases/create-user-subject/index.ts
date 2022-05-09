import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { CreateSubjectModule } from '@src/modules/app/subject/useCases/create-subject';
import { FindSubjectModule } from '@src/modules/app/subject/useCases/find-subject';
import { UpdateSubjectModule } from '@src/modules/app/subject/useCases/update-subject';
import { CreateUserSubjectController } from './controller';
import { CreateUserSubjectService } from './service';

@Module({
  imports: [CreateSubjectModule, FindSubjectModule, UpdateSubjectModule],
  controllers: [CreateUserSubjectController],
  providers: [CreateUserSubjectService]
})
export class CreateUserSubjectModule {}

export const createUserSubjectChildren: RouteTree = {
  path: '/:userId/subject',
  module: CreateUserSubjectModule
};
