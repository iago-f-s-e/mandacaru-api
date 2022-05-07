import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/modules/database/entities';
import { UpdateUserModule } from '../update-user';
import { DeleteUserController } from './controller';
import { DeleteUserService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UpdateUserModule],
  controllers: [DeleteUserController],
  providers: [DeleteUserService]
})
export class DeleteUserModule {}

export const deleteUserChildren: RouteTree = {
  path: '/',
  module: DeleteUserModule
};
