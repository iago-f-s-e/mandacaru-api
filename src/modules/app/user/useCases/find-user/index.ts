import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/modules/database/entities';
import { FindUserRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [FindUserRepository],
  providers: [FindUserRepository]
})
export class FindUserModule {}

export const findUserChildren: RouteTree = {
  path: '/',
  module: FindUserModule
};
