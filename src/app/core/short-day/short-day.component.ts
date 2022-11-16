import { Component, Input, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  map,
  Observable,
  tap,
} from 'rxjs';

import { CalendarDate } from 'src/app/common/calendar-date';
import { CalendarService } from 'src/app/services/calendar.service';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-short-day',
  templateUrl: './short-day.component.html',
  styleUrls: ['./short-day.component.scss'],
})
export class ShortDayComponent implements OnInit {
  @Input('date') date!: CalendarDate;
  @Input('data') data!: Map<string, string[]>;

  get tasks() {
    return this.data.get(this.date.date);
  }

  constructor() {}

  ngOnInit(): void {}
}
