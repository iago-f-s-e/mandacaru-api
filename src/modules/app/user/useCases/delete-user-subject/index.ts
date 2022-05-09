import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { UpdateSubjectModule } from '@src/modules/app/subject/useCases/update-subject';
import { DeleteUserSubjectController } from './controller';
import { DeleteUserSubjectService } from './service';

@Module({
  imports: [UpdateSubjectModule],
  controllers: [DeleteUserSubjectController],
  providers: [DeleteUserSubjectService]
})
export class DeleteUserSubjectModule {}

export const deleteUserSubjectChildren: RouteTree = {
  path: '/:userId/subject',
  module: DeleteUserSubjectModule
};
