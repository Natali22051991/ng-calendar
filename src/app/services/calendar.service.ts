import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  takeUntil,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarDate } from '../common/calendar-date';
import { DestroyService } from '../common/destroy';

@Injectable({
  providedIn: 'root',
})
export class CalendarService extends DestroyService {
  currentDate$ = of(new Date());
  currentDate = new Date();

  public set day(day: number | null) {
    this._selectedDay$.next(day);
  }

  private _selectedDay$ = new BehaviorSubject<number | null>(null);

  public selectedDay$: Observable<number | null> = this._selectedDay$;
  public selectedMonth$ = new BehaviorSubject(this.currentDate.getMonth() + 1);
  public selectedYear$ = new BehaviorSubject(this.currentDate.getFullYear());

  public selectedDate$ = combineLatest([
    this.selectedYear$,
    this.selectedMonth$,
    this.selectedDay$,
  ]).pipe(
    map(([year, month, day]) =>
      !day ? null : new CalendarDate(new Date(`${year}-${month}-${day}`))
    )
  );

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    super();

    combineLatest([this.selectedYear$, this.selectedMonth$, this.selectedDay$])
      .pipe(
        map(([year, month, day]) => {
          const result = { year, month };
          if (day) {
            Object.assign(result, { day });
          }
          return result;
        }),
        takeUntil(this)
      )
      .subscribe((date) => {
        this._router.navigate([], {
          queryParams: date,
        });
      });
  }

  nextDate(): void {
    this.selectedMonth$.value === 12
      ? this.selectedMonth$.next(this.selectedMonth$.value - 11)
      : this.selectedMonth$.next(this.selectedMonth$.value + 1);

    this.selectedMonth$.value === 1
      ? this.selectedYear$.next(this.selectedYear$.value + 1)
      : this.selectedYear$.value;
  }

  prevData(): void {
    this.selectedMonth$.value === 1
      ? this.selectedMonth$.next(this.selectedMonth$.value + 11)
      : this.selectedMonth$.next(this.selectedMonth$.value - 1);

    this.selectedMonth$.value === 1
      ? this.selectedYear$.next(this.selectedYear$.value - 1)
      : this.selectedYear$.value;
  }
}
