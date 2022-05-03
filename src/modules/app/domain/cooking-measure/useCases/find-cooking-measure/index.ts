import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookingMeasure } from '@src/modules/database/entities';
import { FindCookingMeasureController } from './controller';
import { FindCookingMeasureRepository } from './repository';
import { FindCookingMeasureService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([CookingMeasure])],
  exports: [FindCookingMeasureRepository],
  controllers: [FindCookingMeasureController],
  providers: [FindCookingMeasureRepository, FindCookingMeasureService]
})
export class FindCookingMeasureModule {}

export const findCookingMeasureChildren: RouteTree = {
  path: '/',
  module: FindCookingMeasureModule
};
