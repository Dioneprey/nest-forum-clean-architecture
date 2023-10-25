import { NotificationsRepository } from 'src/domain/notification/application/repositories/notificationsRepository'
import { Notification } from 'src/domain/notification/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }

  public items: Notification[] = []
}
