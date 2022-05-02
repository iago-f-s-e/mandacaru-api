import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from '@src/modules/database/entities';
import { FindReferenceModule } from '../find-reference';
import { UpdateReferenceModule } from '../update-reference';
import { CreateReferenceController } from './controller';
import { CreateReferenceRepository } from './repository';
import { CreateReferenceService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Reference]), FindReferenceModule, UpdateReferenceModule],
  controllers: [CreateReferenceController],
  providers: [CreateReferenceRepository, CreateReferenceService]
})
export class CreateReferenceModule {}

export const createReferenceChildren: RouteTree = {
  path: '/',
  module: CreateReferenceModule
};
