import { DomainEvent } from "src/core/events/domain-event";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Question } from "../enterprise/entities/question";

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public question: Question;
  public bestAnswerId: UniqueEntityID;
  public ocurredAt: Date;

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id;
  }
}
