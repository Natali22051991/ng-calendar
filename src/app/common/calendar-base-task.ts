import { calendar } from '../models/calendar';
import { TypeTask } from '../models/type-task';

export abstract class CalendarBaseTask implements calendar.task.Base {
  createDate!: string;
  id = String(Math.trunc(Math.random() * 10000) * Math.random());
  title!: string;
  type!: TypeTask;
  protected constructor() {
  }

}
