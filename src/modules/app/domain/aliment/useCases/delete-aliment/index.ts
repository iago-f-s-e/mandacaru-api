import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliment } from '@src/modules/database/entities';
import { UpdateAlimentModule } from '../update-aliment';
import { DeleteAlimentController } from './controller';
import { DeleteAlimentService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Aliment]), UpdateAlimentModule],
  controllers: [DeleteAlimentController],
  providers: [DeleteAlimentService]
})
export class DeleteAlimentModule {}

export const deleteAlimentChildren: RouteTree = {
  path: '/',
  module: DeleteAlimentModule
};
