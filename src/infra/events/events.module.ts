import { Module } from '@nestjs/common'
import { OnAnswerCreated } from 'src/domain/notification/application/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosen } from 'src/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { SendNotificationUseCase } from 'src/domain/notification/application/use-cases/send-notification'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
