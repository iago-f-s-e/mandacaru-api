import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookingMeasure } from '@src/modules/database/entities';
import { FindCookingMeasureModule } from '../find-cooking-measure';
import { UpdateCookingMeasureModule } from '../update-cooking-measure';
import { CreateCookingMeasureController } from './controller';
import { CreateCookingMeasureRepository } from './repository';
import { CreateCookingMeasureService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CookingMeasure]),
    FindCookingMeasureModule,
    UpdateCookingMeasureModule
  ],
  controllers: [CreateCookingMeasureController],
  providers: [CreateCookingMeasureRepository, CreateCookingMeasureService]
})
export class CreateCookingMeasureModule {}

export const createCookingMeasureChildren: RouteTree = {
  path: '/',
  module: CreateCookingMeasureModule
};
