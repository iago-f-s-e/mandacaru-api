import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookingMeasure } from '@src/modules/database/entities';
import { FindCookingMeasureModule } from '../find-cooking-measure';
import { UpdateCookingMeasureController } from './controller';
import { UpdateCookingMeasureRepository } from './repository';
import { UpdateCookingMeasureService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([CookingMeasure]), FindCookingMeasureModule],
  exports: [UpdateCookingMeasureRepository],
  controllers: [UpdateCookingMeasureController],
  providers: [UpdateCookingMeasureRepository, UpdateCookingMeasureService]
})
export class UpdateCookingMeasureModule {}

export const updateCookingMeasureChildren: RouteTree = {
  path: '/',
  module: UpdateCookingMeasureModule
};
