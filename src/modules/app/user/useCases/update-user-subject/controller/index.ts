import { Body, Controller, Param, Put } from '@nestjs/common';
import { SubjectDTO } from '@src/modules/app/subject/dtos';
import { UpdateSubjectDTO } from '@src/modules/app/subject/useCases/update-subject/dtos';
import { ValidateToUpdateSubject } from '@src/modules/app/subject/useCases/update-subject/entity';
import { UpdateUserSubjectService } from '../service';

@Controller()
export class UpdateUserSubjectController {
  constructor(private readonly updateService: UpdateUserSubjectService) {}

  @Put(':id')
  public async exec(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() body: SubjectDTO
  ): Promise<UpdateSubjectDTO> {
    const subject = new ValidateToUpdateSubject({ ...body, id, userId });

    const updateOrError = await this.updateService.exec(subject.value);

    if (updateOrError.isLeft()) throw updateOrError.value;

    return updateOrError.value;
  }
}
