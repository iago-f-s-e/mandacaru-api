import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrient } from '@src/modules/database/entities';
import { UpdateNutrientModule } from '../update-nutrient';
import { DeleteNutrientController } from './controller';
import { DeleteNutrientService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Nutrient]), UpdateNutrientModule],
  controllers: [DeleteNutrientController],
  providers: [DeleteNutrientService]
})
export class DeleteNutrientModule {}

export const deleteNutrientChildren: RouteTree = {
  path: '/',
  module: DeleteNutrientModule
};
