import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import { CalendarDate } from '../../common/calendar-date';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public data$ = this.dataService.data$.pipe(
    tap((e) => console.log(e)),
    shareReplay({ refCount: false, bufferSize: 1 })
  );

  public listDaysOfSelectedMonth$: Observable<('' | CalendarDate)[]> =
    this.route.queryParams.pipe(
      map((params) => {
        const month = params['month'];
        const year = params['year'];
        return CalendarDate.getCalendarMonth(year, month).map((day) =>
          day === ''
            ? day
            : new CalendarDate(new Date(`${year}-${month}-${day}`))
        );
      })
    );

  public viewDate$: Observable<string> = this.route.queryParams.pipe(
    map((params) =>
      CalendarDate.getMonthYearString(
        new Date(params['year'], +params['month'] - 1)
      )
    )
  );

  constructor(
    private service: CalendarService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  /** Смена месяца */
  changeMonth(next = true) {
    this.service.day = null;
    if (next) {
      this.service.nextDate();
    } else {
      this.service.prevData();
    }
  }

  /** Установка выбранного для просмотра дня */
  setDetailedDay(day: CalendarDate): void {
    this.service.day = day.day;
  }
}
