import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliment } from '@src/modules/database/entities';
import { UpdateCompositionModule } from '../../../composition/useCases/update-composition';
import { FindAlimentModule } from '../find-aliment';
import { UpdateAlimentController } from './controller';
import { UpdateAlimentRepository } from './repository';
import { UpdateAlimentService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Aliment]), FindAlimentModule, UpdateCompositionModule],
  exports: [UpdateAlimentRepository],
  controllers: [UpdateAlimentController],
  providers: [UpdateAlimentRepository, UpdateAlimentService]
})
export class UpdateAlimentModule {}

export const updateAlimentChildren: RouteTree = {
  path: '/',
  module: UpdateAlimentModule
};
