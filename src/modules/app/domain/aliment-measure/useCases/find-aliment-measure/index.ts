import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlimentMeasure } from '@src/modules/database/entities';
import { FindAlimentMeasureRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlimentMeasure])],
  exports: [FindAlimentMeasureRepository],
  providers: [FindAlimentMeasureRepository]
})
export class FindAlimentMeasureModule {}
