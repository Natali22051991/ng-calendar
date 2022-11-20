import { CalendarBaseTask } from './calendar-base-task';
import { calendar } from '../models/calendar';

export class CalendarNote extends CalendarBaseTask implements calendar.task.Note {
  text!: string;
  constructor(data: calendar.task.Note) {
    super();
    Object.assign(this, data);
  }
}
