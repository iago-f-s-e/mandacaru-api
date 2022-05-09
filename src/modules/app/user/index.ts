import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { createUserSubjectChildren, CreateUserSubjectModule } from './useCases/create-user-subject';
import { deleteUserChildren, DeleteUserModule } from './useCases/delete-user';
import { deleteUserSubjectChildren, DeleteUserSubjectModule } from './useCases/delete-user-subject';
import { findUserSubjectChildren, FindUserSubjectModule } from './useCases/find-user-subject';
import { updateUserChildren, UpdateUserModule } from './useCases/update-user';
import { updateUserSubjectChildren, UpdateUserSubjectModule } from './useCases/update-user-subject';

@Module({
  imports: [
    UpdateUserModule,
    DeleteUserModule,
    CreateUserSubjectModule,
    FindUserSubjectModule,
    DeleteUserSubjectModule,
    UpdateUserSubjectModule
  ]
})
export class UserModule {}

export const userChildren: RouteTree = {
  path: '/user',
  module: UserModule,
  children: [
    updateUserChildren,
    deleteUserChildren,
    createUserSubjectChildren,
    findUserSubjectChildren,
    deleteUserSubjectChildren,
    updateUserSubjectChildren
  ]
};
