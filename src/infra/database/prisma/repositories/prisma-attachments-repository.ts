import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AttachmentsRepository } from "src/domain/forum/application/repositories/attachments-repository";
import { Attachment } from "src/domain/forum/enterprise/entities/attachment";
import { PrismaAttachmentMapper } from "../mappers/prisma-attachment.mapper";

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment) {
    const data = PrismaAttachmentMapper.toPrisma(attachment);

    await this.prisma.attachment.create({
      data,
    });
  }
}
