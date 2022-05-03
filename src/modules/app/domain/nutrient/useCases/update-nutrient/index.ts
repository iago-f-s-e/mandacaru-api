import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrient } from '@src/modules/database/entities';
import { FindNutrientModule } from '../find-nutrient';
import { UpdateNutrientController } from './controller';
import { UpdateNutrientRepository } from './repository';
import { UpdateNutrientService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Nutrient]), FindNutrientModule],
  exports: [UpdateNutrientRepository],
  controllers: [UpdateNutrientController],
  providers: [UpdateNutrientRepository, UpdateNutrientService]
})
export class UpdateNutrientModule {}

export const updateNutrientChildren: RouteTree = {
  path: '/',
  module: UpdateNutrientModule
};
