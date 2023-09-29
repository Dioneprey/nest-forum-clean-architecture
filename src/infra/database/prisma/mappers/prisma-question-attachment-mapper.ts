import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { QuestionAttachment } from 'src/domain/forum/enterprise/entities/question-attachment'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type.')
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    attachments: QuestionAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentsId = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    return {
      where: {
        id: {
          in: attachmentsId,
        },
      },
      data: {
        questionId: attachments[0].questionId.toString(),
      },
    }
  }
}
