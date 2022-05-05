import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import {
  createAlimentMeasureChildren,
  CreateAlimentMeasureModule
} from './useCases/create-aliment-measure';
import {
  deleteAlimentMeasureChildren,
  DeleteAlimentMeasureModule
} from './useCases/delete-aliment-measure';
import {
  updateAlimentMeasureChildren,
  UpdateAlimentMeasureModule
} from './useCases/update-aliment-measure';

@Module({
  imports: [CreateAlimentMeasureModule, DeleteAlimentMeasureModule, UpdateAlimentMeasureModule]
})
export class AlimentMeasureModule {}

export const alimentMeasureChildren: RouteTree = {
  path: 'aliment-measure',
  module: AlimentMeasureModule,
  children: [
    createAlimentMeasureChildren,
    deleteAlimentMeasureChildren,
    updateAlimentMeasureChildren
  ]
};
