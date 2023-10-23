import { Prisma, Attachment as PrismaAttachment } from "@prisma/client";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Attachment } from "src/domain/forum/enterprise/entities/attachment";

export class PrismaAttachmentMapper {
  static toDoamain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    };
  }
}
