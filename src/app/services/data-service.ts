import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarService } from './calendar.service';
import { DestroyService } from '../common/destroy';
import { calendar } from '../models/calendar';
import { TypeTask } from '../models/type-task';

@Injectable({
  providedIn: 'root',
})
export class DataService extends DestroyService {
  constructor(private calendarService: CalendarService) {
    super();
  }

  public selectedDay$ = this.calendarService.selectedDate$.pipe();
  public data$ = new BehaviorSubject(new Map<string, calendar.task.Type[]>());

  createTask(data: calendar.task.Type, key: string, type: TypeTask) {
    const _data = this.data$.value;
    _data.has(key) ? _data.get(key)!.push(data) : _data.set(key, [data]);
    this.data$.next(_data);
  }
}
