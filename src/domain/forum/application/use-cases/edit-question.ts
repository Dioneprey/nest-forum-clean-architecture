import { Injectable } from "@nestjs/common";

import { Either, left, right } from "src/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "src/core/errors/resource-not-found-error";
import { NotAllowedError } from "src/core/errors/not-allowed-error";
import { QuestionAttachmentsRepository } from "../repositories/questions-attachments-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title?: string;
  content?: string;
  attachmentsId: string[];
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>;
@Injectable()
export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    );

    const questionsAttachments = attachmentsId.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(questionsAttachments);

    question.title = title || question.title;
    question.content = content || question.content;
    question.attachments = questionAttachmentList;

    await this.questionsRepository.save(question);

    return right({
      question,
    });
  }
}
