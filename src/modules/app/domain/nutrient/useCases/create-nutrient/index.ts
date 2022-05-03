import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrient } from '@src/modules/database/entities';
import { FindNutrientModule } from '../find-nutrient';
import { UpdateNutrientModule } from '../update-nutrient';
import { CreateNutrientController } from './controller';
import { CreateNutrientRepository } from './repository';
import { CreateNutrientService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Nutrient]), FindNutrientModule, UpdateNutrientModule],
  controllers: [CreateNutrientController],
  providers: [CreateNutrientRepository, CreateNutrientService]
})
export class CreateNutrientModule {}

export const createNutrientChildren: RouteTree = {
  path: '/',
  module: CreateNutrientModule
};
