import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { FindSubjectModule } from '@src/modules/app/subject/useCases/find-subject';
import { FindUserSubjectController } from './controller';
import { FindUserSubjectService } from './service';

@Module({
  imports: [FindSubjectModule],
  controllers: [FindUserSubjectController],
  providers: [FindUserSubjectService]
})
export class FindUserSubjectModule {}

export const findUserSubjectChildren: RouteTree = {
  path: '/:userId/subject',
  module: FindUserSubjectModule
};
