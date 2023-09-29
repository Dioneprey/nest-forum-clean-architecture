import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { QuestionsRepository } from "src/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "src/domain/forum/application/repositories/students-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository";
import { AnswerAttachmentRepository } from "src/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerCommentsRepository } from "src/domain/forum/application/repositories/answer-comments-repository";
import { AnswersRepository } from "src/domain/forum/application/repositories/answers-repository";
import { QuestionAttachmentsRepository } from "src/domain/forum/application/repositories/questions-attachments-repository";
import { QuestionCommentsRepository } from "src/domain/forum/application/repositories/question-comments-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerAttachmentRepository,
      useClass: PrismaAnswerAttachmentRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswersRepository,
    AnswerAttachmentRepository,
    AnswerCommentsRepository,
    QuestionsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
