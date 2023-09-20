import { AnswerAttachments } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachments[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
