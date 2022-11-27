import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable, retry } from 'rxjs';
import { CalendarDate } from 'src/app/common/calendar-date';
import { calendar } from '../../models/calendar';
import { DataService } from '../../services/data-service';
import { TypeTask } from '../../models/type-task';

@Component({
  selector: 'app-short-day',
  templateUrl: './short-day.component.html',
  styleUrls: ['./short-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortDayComponent implements OnInit {
  date$ = new BehaviorSubject<CalendarDate | null>(null);
  data$ = new BehaviorSubject<Map<string, calendar.task.Type[]> | null>(null);
  tasks$ = combineLatest([this.dataService.data$, this.date$]).pipe(
    filter(([a, b]) => !!a && !!b),
    map(([data, date]) => {
      return data!.get(date!.date);
    })
  );

  taskNote$: Observable<calendar.task.Type[] | null> = this.tasks$.pipe(
    map(t => t ? t.filter(task => task.type === TypeTask.note) : null)
  )
  taskTask$: Observable<calendar.task.Type[] | null> = this.tasks$.pipe(
    map(t => t ? t.filter(task => task.type === TypeTask.task) : null)
  )
  taskEvent$: Observable<calendar.task.Type[] | null> = this.tasks$.pipe(
    map(t => t ? t.filter(task => task.type === TypeTask.event) : null)
  )
  taskShift$: Observable<calendar.task.Type[] | null> = this.tasks$.pipe(
    map(t => t ? t.filter(task => task.type === TypeTask.shift) : null)
  )

  public refs = TypeTask;

  @Input('date') set date(value: CalendarDate) {
    this.date$.next(value);
  }
  // TODO: изучить проблему с инпутом (перерисовка)
  @Input('data') set data(value: Map<string, calendar.task.Type[]>) {
    this.data$.next(value);
  }

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
}
