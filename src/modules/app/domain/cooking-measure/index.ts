import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import {
  createCookingMeasureChildren,
  CreateCookingMeasureModule
} from './useCases/create-cooking-measure';
import {
  deleteCookingMeasureChildren,
  DeleteCookingMeasureModule
} from './useCases/delete-cooking-measure';
import {
  findCookingMeasureChildren,
  FindCookingMeasureModule
} from './useCases/find-cooking-measure';
import {
  updateCookingMeasureChildren,
  UpdateCookingMeasureModule
} from './useCases/update-cooking-measure';

@Module({
  imports: [
    CreateCookingMeasureModule,
    DeleteCookingMeasureModule,
    FindCookingMeasureModule,
    UpdateCookingMeasureModule
  ]
})
export class CookingMeasureModule {}

export const cookingMeasureChildren: RouteTree = {
  path: '/cooking-measure',
  module: CookingMeasureModule,
  children: [
    createCookingMeasureChildren,
    deleteCookingMeasureChildren,
    findCookingMeasureChildren,
    updateCookingMeasureChildren
  ]
};
