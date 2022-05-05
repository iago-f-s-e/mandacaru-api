import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliment } from '@src/modules/database/entities';
import { FindAlimentController } from './controller';
import { FindAlimentRepository } from './repository';
import { FindAlimentService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Aliment])],
  exports: [FindAlimentRepository],
  controllers: [FindAlimentController],
  providers: [FindAlimentRepository, FindAlimentService]
})
export class FindAlimentModule {}

export const findAlimentChildren: RouteTree = {
  path: '/',
  module: FindAlimentModule
};
