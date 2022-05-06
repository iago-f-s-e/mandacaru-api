import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { domainChildren, DomainModule } from './domain';
import { userChildren, UserModule } from './user';

@Module({
  imports: [DomainModule, UserModule]
})
export class AppModule {}

export const appPrefix: RouteTree = {
  path: '/',
  module: AppModule,
  children: [domainChildren, userChildren]
};
