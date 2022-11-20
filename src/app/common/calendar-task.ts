import { CalendarBaseTask } from './calendar-base-task';
import { calendar } from '../models/calendar';

export class CalendarTask extends CalendarBaseTask implements calendar.task.Task {
  status!: string;
  targetDate!: string;
  text!: string;
   constructor(data: calendar.task.Task) {
     super();
     Object.assign(this, data);
   }
}
