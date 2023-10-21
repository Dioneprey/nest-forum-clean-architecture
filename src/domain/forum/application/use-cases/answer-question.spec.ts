import { expect } from "vitest";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      questionId: "1",
      authorId: "1",
      content: "Answer content",
      attachmentsId: ["1", "2"],
    });

    expect(result.isRight).toBeTruthy();
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityID("2") }),
      ],
    );
  });

  it("should persist attachment when creating a new answer", async () => {
    const result = await sut.execute({
      authorId: "1",
      questionId: "1",
      content: "Sim",
      attachmentsId: ["1", "2"],
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryAnswerAttachmentRepository.items).toHaveLength(2);
    expect(inMemoryAnswerAttachmentRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID("1"),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID("2"),
        }),
      ]),
    );
  });
});
