import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from '@src/modules/database/entities';
import { UpdateReferenceModule } from '../update-reference';
import { DeleteReferenceController } from './controller';
import { DeleteReferenceService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Reference]), UpdateReferenceModule],
  controllers: [DeleteReferenceController],
  providers: [DeleteReferenceService]
})
export class DeleteReferenceModule {}

export const deleteReferenceChildren: RouteTree = {
  path: '/',
  module: DeleteReferenceModule
};
