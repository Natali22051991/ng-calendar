import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  title = 'ng-calendar';
  currentDate = new Date();
  currentMonth =
    33 -
    new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      33
    ).getDate();

  currentDay = this.currentDate.getDay(); //
  divDay!: string | number;
  isActive: boolean = true;
  text: string = '';
  dayData!: string[];

  selectedMonth$ = new BehaviorSubject(this.currentDate.getMonth() + 1);
  selectedYear$ = new BehaviorSubject(this.currentDate.getFullYear());
  selectedDay$ = new BehaviorSubject(this.currentDate.getDate());
  data$ = new BehaviorSubject(new Map<string, string[]>());

  viewDate$ = combineLatest([this.selectedMonth$, this.selectedYear$]).pipe(
    map(([m, y]) => {
      console.log(m, y);

      const month = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
      }).format(new Date(m.toString()));
      console.log(month);

      return month + ' ' + y;
    })
  );

  // nextDay = this.currentMonth - this.selectedDay$.value;

  month$ = this.selectedMonth$.pipe(
    map((month) => {
      console.log(month);
      const date = new Date(this.selectedYear$.value, month, 1);
      const days = 33 - new Date(this.selectedYear$.value, month, 33).getDate();
      const day = new Date(this.selectedYear$.value, month, 1).getDay();
      console.log(date);
      console.log(day);
      console.log(days);

      return new Array(42)
        .fill('')
        .map((el, i) =>
          i + 1 < day ? '' : i > days + day - 2 ? '' : i + 2 - day
        );
    })
  );

  prev(): void {
    this.selectedMonth$.value === 1
      ? this.selectedMonth$.next(this.selectedMonth$.value + 11)
      : this.selectedMonth$.next(this.selectedMonth$.value - 1);

    this.selectedMonth$.value === 1
      ? this.selectedYear$.next(this.selectedYear$.value - 1)
      : this.selectedYear$.value;
  }

  next(): void {
    this.selectedMonth$.value === 12
      ? this.selectedMonth$.next(this.selectedMonth$.value - 11)
      : this.selectedMonth$.next(this.selectedMonth$.value + 1);

    this.selectedMonth$.value === 1
      ? this.selectedYear$.next(this.selectedYear$.value + 1)
      : this.selectedYear$.value;
    this.selectedDay$.next(this.selectedDay$.value + 1);
  }

  ngOnInit(): void {
    console.log(this.currentDate, this.currentMonth);
    console.log(this.selectedDay$.value);
  }

  getDay(day: number | string): void {
    this.divDay = day;
  }
  clearDate(): void {
    this.divDay = '';
  }
  add(): void {
    this.isActive = false;
  }

  saveSubmit(text: string) {
    this.isActive = true;
    const data = this.data$.value;
    data.has(
      `${this.divDay.toString()}.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`
    )
      ? data
          .get(
            `${this.divDay.toString()}.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`
          )
          ?.push(text)
      : data.set(
          `${this.divDay.toString()}.${this.selectedMonth$.value.toString()}.${this.selectedYear$.value.toString()}`,
          [text]
        );
    console.log(data.keys());
    this.data$.next(data);
  }
}
