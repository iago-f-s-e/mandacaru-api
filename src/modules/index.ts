import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppModule, appPrefix } from './app';
import { AuthModule, authPrefix } from './auth';
import { CommonModule } from './common';
import { DatabaseModule } from './database';

@Module({
  imports: [
    DatabaseModule,
    AppModule,
    AuthModule,
    CommonModule,
    RouterModule.register([appPrefix, authPrefix])
  ]
})
export class Modules {}
