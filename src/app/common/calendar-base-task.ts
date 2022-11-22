import { calendar } from '../models/calendar';
import { TypeTask } from '../models/type-task';

export class CalendarBaseTask implements calendar.task.Base {
  createDate = new Date().toString();
  id = String(Math.trunc(Math.random() * 10000) * Math.random());
  title!: string;
  type!: TypeTask;
  constructor() {}
}
