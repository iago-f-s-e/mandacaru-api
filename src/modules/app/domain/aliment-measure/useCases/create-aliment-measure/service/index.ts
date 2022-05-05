import { ConflictException, Injectable } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types/responses';
import { AlimentMeasure } from '@src/modules/database/entities';
import { FindAlimentMeasureRepository } from '../../find-aliment-measure/repository';
import { UpdateAlimentMeasureRepository } from '../../update-aliment-measure/repository';
import { CreateAlimentMeasureDTO } from '../dtos';
import { CreateAlimentMeasureRepository } from '../repository';

@Injectable()
export class CreateAlimentMeasureService {
  constructor(
    private readonly createAlimentMeasure: CreateAlimentMeasureRepository,
    private readonly findAlimentMeasure: FindAlimentMeasureRepository,
    private readonly updateAlimentMeasure: UpdateAlimentMeasureRepository
  ) {}

  private insert(data: CreateAlimentMeasureDTO): Promise<AlimentMeasure> {
    return this.createAlimentMeasure.exec(data);
  }

  private errorMessage(data: AlimentMeasure): string {
    return `The name "${data.measure.name}" already exists`;
  }

  public async exec(data: CreateAlimentMeasureDTO): CreateResponse<AlimentMeasure> {
    const existing = await this.findAlimentMeasure.existing(
      data.alimentId,
      data.measureId,
      data.referenceId
    );

    if (!existing) return right(await this.insert(data));

    if (existing.isActive) return left(new ConflictException(this.errorMessage(existing)));

    await this.updateAlimentMeasure.reactive(existing.id);

    return right(existing);
  }
}
