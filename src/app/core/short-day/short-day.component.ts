import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, retry } from 'rxjs';
import { CalendarDate } from 'src/app/common/calendar-date';
import { calendar } from '../../models/calendar';

@Component({
  selector: 'app-short-day',
  templateUrl: './short-day.component.html',
  styleUrls: ['./short-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortDayComponent implements OnInit {
  date$ = new BehaviorSubject<CalendarDate | null>(null);
  data$ = new BehaviorSubject<Map<string, calendar.task.Type[]> | null>(null);
  tasks$ = combineLatest([this.data$, this.date$]).pipe(
    filter(([a, b]) => !!a && !!b),
    map(([data, date]) => {
      console.log(data!.get(date!.hourse.toString()));

      return data!.get(date!.date);
    })
  );
  @Input('date') set date(value: CalendarDate) {
    this.date$.next(value);
  }
  @Input('data') set data(value: Map<string, calendar.task.Type[]>) {
    this.data$.next(value);
  }

  constructor() {}

  ngOnInit(): void {}
}
