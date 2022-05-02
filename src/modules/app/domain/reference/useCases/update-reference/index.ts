import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from '@src/modules/database/entities';
import { FindReferenceModule } from '../find-reference';
import { UpdateReferenceController } from './controller';
import { UpdateReferenceRepository } from './repository';
import { UpdateReferenceService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Reference]), FindReferenceModule],
  exports: [UpdateReferenceRepository],
  controllers: [UpdateReferenceController],
  providers: [UpdateReferenceRepository, UpdateReferenceService]
})
export class UpdateReferenceModule {}

export const updateReferenceChildren: RouteTree = {
  path: '/',
  module: UpdateReferenceModule
};
