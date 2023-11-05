import { DomainEvent } from "src/core/events/domain-event";
import { Answer } from "../enterprise/entities/answer";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id;
  }
}
