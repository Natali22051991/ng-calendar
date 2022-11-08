import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import { CalendarDate } from '../../common/calendar-date';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
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

  public selectedMonth$ = this.service.selectedMonth$;
  public selectedYear$ = this.service.selectedYear$;
  public selectedDay$ = this.service.selectedDay$;
  public selectedDate$ = this.service.selectedDate$;
  public data$ = new BehaviorSubject(new Map<string, string[]>());

  public viewDate$ = this.service.viewDate$;

  public month$: Observable<('' | CalendarDate)[]> = this.route.queryParams.pipe(
    map(params => {
      const month = params['month'];
      const year = params['year'];
      return {month, year};
    }),
    map(({
           month,
           year
         }) => CalendarDate.getCalendarMonth(year, month).map(day => day === '' ? day : new CalendarDate(new Date(`${year}-${month}-${day}`))))
  );

  prev(): void {
    this.service.prev();
  }

  next(): void {
    this.service.nextDate();
  }

  constructor(
    private service: CalendarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.service.currentDate$.subscribe(e => console.log(e));
  }

  ngOnInit(): void {
    console.log(this.currentDate, this.currentMonth);
  }

  setDay(day: '' | CalendarDate): void {
    if (day instanceof CalendarDate) {
      this.router.navigate([], {
        queryParams: {
          day: day.day
        }, queryParamsHandling: 'merge'
      });
    }
  }

  clearDate(): void {
    this.router.navigate([], {
      queryParams: {
        day: null
      }
    });
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
