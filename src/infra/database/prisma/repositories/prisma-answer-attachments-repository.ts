import { Injectable } from "@nestjs/common";
import { AnswerAttachmentRepository } from "src/domain/forum/application/repositories/answer-attachments-repository";
import { PrismaAnswerAttachmentMapper } from "../mappers/prisma-answer-attachment-mapper";
import { PrismaService } from "../prisma.service";
import { AnswerAttachment } from "src/domain/forum/enterprise/entities/answer-attachment";

@Injectable()
export class PrismaAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    });

    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain);
  }

  async deleteManyByAnswerId(answerId: string) {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    });
  }

  async createMany(attachments: AnswerAttachment[]) {
    if (attachments.length === 0) {
      return;
    }

    const data = PrismaAnswerAttachmentMapper.toPrismaUpdateMany(attachments);

    await this.prisma.attachment.updateMany(data);
  }

  async deleteMany(attachments: AnswerAttachment[]) {
    if (attachments.length === 0) {
      return;
    }

    const attachmentsId = attachments.map((attachment) => {
      return attachment.id.toString();
    });

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsId,
        },
      },
    });
  }
}
