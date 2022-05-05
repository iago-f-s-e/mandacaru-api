import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlimentMeasure } from '@src/modules/database/entities';
import { FindAlimentMeasureModule } from '../find-aliment-measure';
import { UpdateAlimentMeasureController } from './controller';
import { UpdateAlimentMeasureRepository } from './repository';
import { UpdateAlimentMeasureService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([AlimentMeasure]), FindAlimentMeasureModule],
  exports: [UpdateAlimentMeasureRepository],
  controllers: [UpdateAlimentMeasureController],
  providers: [UpdateAlimentMeasureRepository, UpdateAlimentMeasureService]
})
export class UpdateAlimentMeasureModule {}

export const updateAlimentMeasureChildren: RouteTree = {
  path: '/',
  module: UpdateAlimentMeasureModule
};
