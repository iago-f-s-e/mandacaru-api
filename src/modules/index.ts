import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppModule, appPrefix } from './app';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule, AppModule, RouterModule.register([appPrefix])]
})
export class Modules {}
