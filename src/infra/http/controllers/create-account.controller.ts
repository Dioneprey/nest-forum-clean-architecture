import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe'
import { RegisterStudentUseCase } from 'src/domain/forum/application/use-cases/register-student'
import { StudentAlreadyExistsError } from 'src/domain/forum/application/use-cases/errors/student-already-exists-error'
import { Public } from 'src/infra/auth/public'

const createBodyAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateBodyAccountBodySchema = z.infer<typeof createBodyAccountBodySchema>
@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerStudentUseCase: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createBodyAccountBodySchema))
  async handle(@Body() body: CreateBodyAccountBodySchema) {
    const { name, email, password } = createBodyAccountBodySchema.parse(body)

    const result = await this.registerStudentUseCase.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
