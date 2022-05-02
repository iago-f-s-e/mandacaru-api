import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { createReferenceChildren, CreateReferenceModule } from './useCases/create-reference';
import { deleteReferenceChildren, DeleteReferenceModule } from './useCases/delete-reference';
import { findReferenceChildren, FindReferenceModule } from './useCases/find-reference';
import { updateReferenceChildren, UpdateReferenceModule } from './useCases/update-reference';

@Module({
  imports: [
    CreateReferenceModule,
    DeleteReferenceModule,
    FindReferenceModule,
    UpdateReferenceModule
  ]
})
export class ReferenceModule {}

export const referenceChildren: RouteTree = {
  path: '/reference',
  module: ReferenceModule,
  children: [
    createReferenceChildren,
    deleteReferenceChildren,
    findReferenceChildren,
    updateReferenceChildren
  ]
};
