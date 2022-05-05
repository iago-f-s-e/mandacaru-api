import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliment } from '@src/modules/database/entities';
import { FindAlimentModule } from '../find-aliment';
import { CreateAlimentController } from './controller';
import { CreateAlimentRepository } from './repository';
import { CreateAlimentService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Aliment]), FindAlimentModule],
  controllers: [CreateAlimentController],
  providers: [CreateAlimentRepository, CreateAlimentService]
})
export class CreateAlimentModule {}

export const createAlimentChildren: RouteTree = {
  path: '/',
  module: CreateAlimentModule
};
