import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DomainModule, domainPrefix } from './domain';

@Module({
  imports: [DomainModule, RouterModule.register([domainPrefix])]
})
export class AppModule {}
