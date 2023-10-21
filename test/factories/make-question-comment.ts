import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import {
  QuestionComment,
  QuestionCommentProps,
} from "src/domain/forum/enterprise/entities/question-comment";
import { PrismaQuestionCommentMapper } from "src/infra/database/prisma/mappers/prisma-question-comment-mapper";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return questionComment;
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionComment(
    data: Partial<QuestionCommentProps> = {},
  ): Promise<QuestionComment> {
    const questioncomment = makeQuestionComment(data);

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questioncomment),
    });

    return questioncomment;
  }
}
