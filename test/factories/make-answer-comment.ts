import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import {
  AnswerComment,
  AnswerCommentProps,
} from "src/domain/forum/enterprise/entities/answer-comment";
import { PrismaAnswerCommentMapper } from "src/infra/database/prisma/mappers/prisma-answer-comment.mapper";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return answerComment;
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerComment(
    data: Partial<AnswerCommentProps> = {},
  ): Promise<AnswerComment> {
    const answercomment = makeAnswerComment(data);

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answercomment),
    });

    return answercomment;
  }
}
