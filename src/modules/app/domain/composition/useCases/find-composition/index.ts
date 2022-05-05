import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Composition } from '@src/modules/database/entities';
import { FindCompositionRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Composition])],
  exports: [FindCompositionRepository],
  providers: [FindCompositionRepository]
})
export class FindCompositionModule {}
