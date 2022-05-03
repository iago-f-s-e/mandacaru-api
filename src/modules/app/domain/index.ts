import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { cookingMeasureChildren, CookingMeasureModule } from './cooking-measure';
import { nutrientChildren, NutrientModule } from './nutrient';
import { referenceChildren, ReferenceModule } from './reference';

@Module({
  imports: [CookingMeasureModule, NutrientModule, ReferenceModule]
})
export class DomainModule {}

export const domainPrefix: RouteTree = {
  path: '/',
  module: DomainModule,
  children: [cookingMeasureChildren, nutrientChildren, referenceChildren]
};
