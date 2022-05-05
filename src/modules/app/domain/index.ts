import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { alimentChildren, AlimentModule } from './aliment';
import { alimentMeasureChildren, AlimentMeasureModule } from './aliment-measure';
import { cookingMeasureChildren, CookingMeasureModule } from './cooking-measure';
import { nutrientChildren, NutrientModule } from './nutrient';
import { recipeChildren, RecipeModule } from './recipe';
import { referenceChildren, ReferenceModule } from './reference';

@Module({
  imports: [
    AlimentModule,
    AlimentMeasureModule,
    CookingMeasureModule,
    NutrientModule,
    ReferenceModule,
    RecipeModule
  ]
})
export class DomainModule {}

export const domainPrefix: RouteTree = {
  path: '/',
  module: DomainModule,
  children: [
    alimentChildren,
    alimentMeasureChildren,
    cookingMeasureChildren,
    nutrientChildren,
    recipeChildren,
    referenceChildren
  ]
};
