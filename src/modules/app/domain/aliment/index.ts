import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { createAlimentChildren, CreateAlimentModule } from './useCases/create-aliment';
import { deleteAlimentChildren, DeleteAlimentModule } from './useCases/delete-aliment';
import { findAlimentChildren, FindAlimentModule } from './useCases/find-aliment';
import { updateAlimentChildren, UpdateAlimentModule } from './useCases/update-aliment';

@Module({
  imports: [CreateAlimentModule, DeleteAlimentModule, FindAlimentModule, UpdateAlimentModule]
})
export class AlimentModule {}

export const alimentChildren: RouteTree = {
  path: '/aliment',
  module: AlimentModule,
  children: [
    createAlimentChildren,
    deleteAlimentChildren,
    findAlimentChildren,
    updateAlimentChildren
  ]
};
