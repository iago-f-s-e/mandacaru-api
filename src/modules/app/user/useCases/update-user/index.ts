import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateAddressModule } from '@src/modules/app/address/useCases/update-address';
import { User } from '@src/modules/database/entities';
import { FindUserModule } from '../find-user';
import { UpdateUserController } from './controller';
import { UpdateUserRepository } from './repository';
import { UpdateUserService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FindUserModule, UpdateAddressModule],
  controllers: [UpdateUserController],
  exports: [UpdateUserRepository],
  providers: [UpdateUserRepository, UpdateUserService]
})
export class UpdateUserModule {}

export const updateUserChildren: RouteTree = {
  path: '/',
  module: UpdateUserModule
};
