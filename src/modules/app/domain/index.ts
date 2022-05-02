import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { referenceChildren, ReferenceModule } from './reference';

@Module({
  imports: [ReferenceModule]
})
export class DomainModule {}

export const domainPrefix: RouteTree = {
  path: '/',
  module: DomainModule,
  children: [referenceChildren]
};
