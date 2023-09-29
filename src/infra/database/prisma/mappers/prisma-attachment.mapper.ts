import { Prisma } from '@prisma/client'
import { Attachment } from 'src/domain/forum/enterprise/entities/attachment'

export class PrismaAttachmentMapper {
  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
