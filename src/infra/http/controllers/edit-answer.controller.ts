import {
  BadRequestException,
  Body,
  Controller,
  Put,
  HttpCode,
  Param,
} from "@nestjs/common";
import { CurrentUser } from "src/infra/auth/current-user.decorator";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";

import { z } from "zod";
import { EditAnswerUseCase } from "src/domain/forum/application/use-cases/edit-answer";

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
});

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema);

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>;

@Controller("/answers/:id")
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param("id") answerId: string,
  ) {
    const { content, attachments } = body;
    const userId = user.sub;

    const result = await this.editAnswer.execute({
      content,
      authorId: userId,
      answerId,
      attachmentsId: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
