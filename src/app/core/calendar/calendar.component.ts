import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import { CalendarDate } from '../../common/calendar-date';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';

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
  // divDay!: string | number;
  isActive: boolean = true;
  text: string = '';
  // dayData!: string | number;

  public selectedMonth$ = this.service.selectedMonth$;
  public selectedYear$ = this.service.selectedYear$;
  public selectedDay$ = this.service.selectedDay$;
  public selectedDate$ = this.service.selectedDate$;
  public viewDate$ = this.service.viewDate$;
  public data$ = this.dataService.data$;

  public month$: Observable<('' | CalendarDate)[]> =
    this.route.queryParams.pipe(
      map((params) => {
        const month = params['month'];
        const year = params['year'];
        return { month, year };
      }),
      map(({ month, year }) =>
        CalendarDate.getCalendarMonth(year, month).map((day) => {
          const res =
            day === ''
              ? ''
              : new CalendarDate(new Date(`${year}-${month}-${day}`));
          return res;
        })
      )
    );

  prev(): void {
    this.service.prev();
  }

  next(): void {
    this.service.nextDate();
  }

  constructor(
    private service: CalendarService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {
    this.service.currentDate$.subscribe((e) => console.log(e));
  }

  ngOnInit(): void {
    console.log(this.currentDate, this.currentMonth);
  }

  setDay(day: '' | CalendarDate): void {
    this.dataService.setDay(day);
  }

  // saveSubmit(text: string) {
  //   this.dataService.saveSubmit(text);
  // }
}
