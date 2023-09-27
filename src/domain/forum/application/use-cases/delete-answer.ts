import { Either, left, right } from "src/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "src/core/errors/resource-not-found-error";
import { NotAllowedError } from "src/core/errors/not-allowed-error";

interface DeleteAnswersUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswersUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
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
