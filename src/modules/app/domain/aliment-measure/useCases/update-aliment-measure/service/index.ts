import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';
import { FindAlimentMeasureRepository } from '../../find-aliment-measure/repository';
import { UpdateAlimentMeasureDTO } from '../dtos';
import { UpdateAlimentMeasureRepository } from '../repository';

type Errors = {
  notFound: string;
};

@Injectable()
export class UpdateAlimentMeasureService {
  constructor(
    private readonly updateAlimentMeasure: UpdateAlimentMeasureRepository,
    private readonly findAlimentMeasure: FindAlimentMeasureRepository
  ) {}

  private errorMessage(): Errors {
    return {
      notFound: 'AlimentMeasure is not found'
    };
  }

  public async exec(data: UpdateAlimentMeasureDTO): UpdateResponse<UpdateAlimentMeasureDTO> {
    const error = this.errorMessage();

    const original = await this.findAlimentMeasure.active(data.id);

    if (!original) return left(new NotFoundException(error.notFound));

    await this.updateAlimentMeasure.exec(data);

    return right(data);
  }
}
