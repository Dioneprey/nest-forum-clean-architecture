import { AnswerAttachmentRepository } from "src/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "src/domain/forum/enterprise/entities/answer-attachment";

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  public items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string) {
    const answerAttachment = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    );

    return answerAttachment;
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachment = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    );

    this.items = answerAttachment;
  }

  async createMany(attachments: AnswerAttachment[]) {
    this.items.push(...attachments);
  }

  async deleteMany(attachments: AnswerAttachment[]) {
    const answerAttachment = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item));
    });

    this.items = answerAttachment;
  }
}
