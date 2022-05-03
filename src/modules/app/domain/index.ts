import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { nutrientChildren, NutrientModule } from './nutrient';
import { referenceChildren, ReferenceModule } from './reference';

@Module({
  imports: [NutrientModule, ReferenceModule]
})
export class DomainModule {}

export const domainPrefix: RouteTree = {
  path: '/',
  module: DomainModule,
  children: [nutrientChildren, referenceChildren]
};
