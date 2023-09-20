import { Injectable } from '@nestjs/common'
import { QuestionAttachmentsRepository } from 'src/domain/forum/application/repositories/questions-attachments-repository'
import { QuestionAttachment } from 'src/domain/forum/enterprise/entities/question-attachment'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
