import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarService } from './calendar.service';
import { DestroyService } from '../common/destroy';

@Injectable({
  providedIn: 'root'
})
export class DataService extends DestroyService {

  constructor(
    private calendarService: CalendarService
  ) {
    super();
  }

  public selectedDay$ = this.calendarService.selectedDate$.pipe();
  public data$ = new BehaviorSubject(new Map<string, string[]>());

  saveSubmit(text: string, key: string) {
    const data = this.data$.value;
    data.has(key)
      ? data.get(key)!.push(text)
      : data.set(key, [text]);
    this.data$.next(data);
  }
}
