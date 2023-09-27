import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Delete,
} from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { DeleteAnswerUseCase } from 'src/domain/forum/application/use-cases/delete-answer'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswer.execute({
      answerId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
