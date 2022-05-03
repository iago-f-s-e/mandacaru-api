import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrient } from '@src/modules/database/entities';
import { FindNutrientController } from './controller';
import { FindNutrientRepository } from './repository';
import { FindNutrientService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Nutrient])],
  exports: [FindNutrientRepository],
  controllers: [FindNutrientController],
  providers: [FindNutrientRepository, FindNutrientService]
})
export class FindNutrientModule {}

export const findNutrientChildren: RouteTree = {
  path: '/',
  module: FindNutrientModule
};
