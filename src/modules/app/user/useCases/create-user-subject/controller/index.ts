import { Body, Controller, Param, Post } from '@nestjs/common';
import { SubjectDTO } from '@src/modules/app/subject/dtos';
import { ValidateToCreateSubject } from '@src/modules/app/subject/useCases/create-subject/entity';
import { Subject } from '@src/modules/database/entities';
import { CreateUserSubjectService } from '../service';

@Controller()
export class CreateUserSubjectController {
  constructor(private readonly createService: CreateUserSubjectService) {}

  @Post()
  public async exec(@Param('userId') userId: string, @Body() body: SubjectDTO): Promise<Subject> {
    const subject = new ValidateToCreateSubject({ ...body, userId });

    const createOrError = await this.createService.exec(subject.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
