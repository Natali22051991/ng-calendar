import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { CalendarDate } from '../common/calendar-date';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dayData!: string | number;
  key!: string;
  constructor(
    private calendarService: CalendarService,
    private router: Router
  ) {}
  public selectedDay$ = this.calendarService.selectedDate$.pipe(
    tap((d) => (this.dayData = d!.day))
  );
  public data$ = new BehaviorSubject(new Map<string, string[]>());

  public selectedMonth$ = this.calendarService.selectedMonth$;
  public selectedYear$ = this.calendarService.selectedYear$;

  setDay(day: '' | CalendarDate): void {
    if (day === '') {
      this.router.navigate([], {
        queryParams: {
          day: '',
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        queryParams: {
          day: day.day,
        },
        queryParamsHandling: 'merge',
      });
      this.dayData = day.date;
    }
  }

  saveSubmit(text: string, key: string) {
    console.log(key);

    const data = this.data$.value;

    const _key = key
      ? key
      : `${
          this.dayData
        }.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`;
    console.log(this.dayData);
    data.has(_key) ? data.get(_key)!.push(text) : data.set(_key, [text]);
    console.log(data);
    this.data$.next(data);
  }
}
