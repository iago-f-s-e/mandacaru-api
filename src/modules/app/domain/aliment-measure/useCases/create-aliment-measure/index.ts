import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlimentMeasure } from '@src/modules/database/entities';
import { FindAlimentMeasureModule } from '../find-aliment-measure';
import { UpdateAlimentMeasureModule } from '../update-aliment-measure';
import { CreateAlimentMeasureController } from './controller';
import { CreateAlimentMeasureRepository } from './repository';
import { CreateAlimentMeasureService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlimentMeasure]),
    FindAlimentMeasureModule,
    UpdateAlimentMeasureModule
  ],
  controllers: [CreateAlimentMeasureController],
  providers: [CreateAlimentMeasureRepository, CreateAlimentMeasureService]
})
export class CreateAlimentMeasureModule {}

export const createAlimentMeasureChildren: RouteTree = {
  path: '/',
  module: CreateAlimentMeasureModule
};
