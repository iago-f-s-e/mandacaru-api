import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';

@Module({})
export class UserModule {}

export const userChildren: RouteTree = {
  path: '/user',
  module: UserModule,
  children: []
};
