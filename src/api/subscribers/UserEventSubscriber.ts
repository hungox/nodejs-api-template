import { EventSubscriber, On } from 'event-dispatch';

import { User } from '@api/models/User';
import { Logger } from '@base/utils/logger';

import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class UserEventSubscriber {
  @On(events.user.created)
  public onUserCreate(user: User): void {
    log.info(`User ${user.toString()} created!`);
  }
}
