import {
  Controller,
  Post,
  UsePipes,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe'

import { z } from 'zod'
import { AuthenticateStudentUseCase } from 'src/domain/forum/application/use-cases/authenticate-student'
import { WrongCredentialsError } from 'src/domain/forum/application/use-cases/errors/wrong-credentials-error'
import { Public } from 'src/infra/auth/public'

const authenticateBodyBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodyBodySchema = z.infer<typeof authenticateBodyBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodyBodySchema))
  async handle(@Body() body: AuthenticateBodyBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }
}
