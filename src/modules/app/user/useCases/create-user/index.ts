import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { User } from '@src/modules/database/entities';
import { FindUserModule } from '../find-user';
import { CreateUserRepository } from './repository';
import { CreateUserService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule, FindUserModule],
  exports: [CreateUserService],
  providers: [CreateUserRepository, CreateUserService]
})
export class CreateUserModule {}

export const createUserChildren: RouteTree = {
  path: '/',
  module: CreateUserModule
};
