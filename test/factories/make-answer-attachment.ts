import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import {
  AnswerAttachments,
  AnswerAttachmentsProps,
} from 'src/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentsProps> = {},
  id?: UniqueEntityID,
) {
  const answerAttachments = AnswerAttachments.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answerAttachments
}
