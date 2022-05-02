import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from '@src/modules/database/entities';
import { FindReferenceController } from './controller';
import { FindReferenceRepository } from './repository';
import { FindReferenceService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Reference])],
  exports: [FindReferenceRepository],
  controllers: [FindReferenceController],
  providers: [FindReferenceRepository, FindReferenceService]
})
export class FindReferenceModule {}

export const findReferenceChildren: RouteTree = {
  path: '/',
  module: FindReferenceModule
};
