import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { UpdateAddressModule } from '@src/modules/app/address/useCases/update-address';
import { FindSubjectModule } from '@src/modules/app/subject/useCases/find-subject';
import { UpdateSubjectModule } from '@src/modules/app/subject/useCases/update-subject';
import { UpdateUserSubjectController } from './controller';
import { UpdateUserSubjectService } from './service';

@Module({
  imports: [FindSubjectModule, UpdateSubjectModule, UpdateAddressModule],
  controllers: [UpdateUserSubjectController],
  providers: [UpdateUserSubjectService]
})
export class UpdateUserSubjectModule {}

export const updateUserSubjectChildren: RouteTree = {
  path: '/:userId/subject',
  module: UpdateUserSubjectModule
};
