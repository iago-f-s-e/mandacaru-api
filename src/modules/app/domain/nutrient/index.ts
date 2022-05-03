import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { createNutrientChildren, CreateNutrientModule } from './useCases/create-nutrient';
import { deleteNutrientChildren, DeleteNutrientModule } from './useCases/delete-nutrient';
import { findNutrientChildren, FindNutrientModule } from './useCases/find-nutrient';
import { updateNutrientChildren, UpdateNutrientModule } from './useCases/update-nutrient';

@Module({
  imports: [CreateNutrientModule, DeleteNutrientModule, FindNutrientModule, UpdateNutrientModule]
})
export class NutrientModule {}

export const nutrientChildren: RouteTree = {
  path: '/nutrient',
  module: NutrientModule,
  children: [
    createNutrientChildren,
    deleteNutrientChildren,
    findNutrientChildren,
    updateNutrientChildren
  ]
};
