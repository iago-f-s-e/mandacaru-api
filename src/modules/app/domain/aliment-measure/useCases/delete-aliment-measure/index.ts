import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlimentMeasure } from '@src/modules/database/entities';
import { UpdateAlimentMeasureModule } from '../update-aliment-measure';
import { DeleteAlimentMeasureController } from './controller';
import { DeleteAlimentMeasureService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([AlimentMeasure]), UpdateAlimentMeasureModule],
  controllers: [DeleteAlimentMeasureController],
  providers: [DeleteAlimentMeasureService]
})
export class DeleteAlimentMeasureModule {}

export const deleteAlimentMeasureChildren: RouteTree = {
  path: '/',
  module: DeleteAlimentMeasureModule
};
