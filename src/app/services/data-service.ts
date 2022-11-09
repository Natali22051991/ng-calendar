import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  divDay!: string | number;
  constructor(private calendarService: CalendarService) {}
  public data$ = new BehaviorSubject(new Map<string, string[]>());

  public selectedMonth$ = this.calendarService.selectedMonth$;
  public selectedYear$ = this.calendarService.selectedYear$;

  saveSubmit(text: string) {
    const data = this.data$.value;
    data.has(
      `${
        this.divDay
      }.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`
    )
      ? data
          .get(
            `${
              this.divDay
            }.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`
          )
          ?.push(text)
      : data.set(
          `${
            this.divDay
          }.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`,
          [text]
        );
    console.log(data.keys());
    this.data$.next(data);
  }
}
