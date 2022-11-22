import { calendar } from '../models/calendar';
import { CalendarBaseTask } from './calendar-base-task';

export class CalendarShift
  extends CalendarBaseTask
  implements calendar.task.WorkingShift
{
  description!: string;
  shift!: calendar.task.Shift;
  constructor(data: calendar.task.WorkingShift) {
    super();
    Object.assign(this, data);
  }
}
