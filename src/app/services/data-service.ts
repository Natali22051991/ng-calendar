import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CalendarDate } from '../common/calendar-date';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dayData!: string | number;
  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public data$ = new BehaviorSubject(new Map<string, string[]>());

  public selectedMonth$ = this.calendarService.selectedMonth$;
  public selectedYear$ = this.calendarService.selectedYear$;

  setDay(day: '' | CalendarDate): void {
    if (day instanceof CalendarDate) {
      this.router.navigate([], {
        queryParams: {
          day: day.day,
        },
        queryParamsHandling: 'merge',
      });

      console.log(day);
    }
    this.dayData = day.toString();
    console.log(this.dayData);
  }

  saveSubmit(text: string) {
    const data = this.data$.value;
    data.has(
      `${
        this.dayData
      }.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`
    )
      ? data
          .get(
            `${
              this.dayData
            }.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`
          )
          ?.push(text)
      : data.set(
          `${
            this.dayData
          }.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`,
          [text]
        );
    console.log(data);

    this.data$.next(data);
  }
}
