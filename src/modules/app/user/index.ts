import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { deleteUserChildren, DeleteUserModule } from './useCases/delete-user';
import { updateUserChildren, UpdateUserModule } from './useCases/update-user';

@Module({
  imports: [UpdateUserModule, DeleteUserModule]
})
export class UserModule {}

export const userChildren: RouteTree = {
  path: '/user',
  module: UserModule,
  children: [updateUserChildren, deleteUserChildren]
};
