import { CalendarBaseTask } from './calendar-base-task';
import { calendar } from '../models/calendar';

export class CalendarEvent extends CalendarBaseTask implements calendar.task.Event {
  eventType!: string;
  text!: string;

  constructor(data: calendar.task.Event) {
    super();
    Object.assign(this, data);
  }
}
