import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookingMeasure } from '@src/modules/database/entities';
import { UpdateCookingMeasureModule } from '../update-cooking-measure';
import { DeleteCookingMeasureController } from './controller';
import { DeleteCookingMeasureService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([CookingMeasure]), UpdateCookingMeasureModule],
  controllers: [DeleteCookingMeasureController],
  providers: [DeleteCookingMeasureService]
})
export class DeleteCookingMeasureModule {}

export const deleteCookingMeasureChildren: RouteTree = {
  path: '/',
  module: DeleteCookingMeasureModule
};
