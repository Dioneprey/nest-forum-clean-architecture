import { Either, left, right } from "src/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "src/core/errors/resource-not-found-error";
import { NotAllowedError } from "src/core/errors/not-allowed-error";
import { Injectable } from "@nestjs/common";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

@Injectable()
export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answers = await this.answersRepository.findById(answerId);

    if (!answers) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answers.authorId.toString()) {
      return left(new NotAllowedError());
    }

    this.answersRepository.delete(answers);

    return right(null);
  }
}
