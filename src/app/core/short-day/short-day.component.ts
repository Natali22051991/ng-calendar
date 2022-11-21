import { Component, Input, OnInit } from '@angular/core';
import { CalendarDate } from 'src/app/common/calendar-date';
import { calendar } from '../../models/calendar';

@Component({
  selector: 'app-short-day',
  templateUrl: './short-day.component.html',
  styleUrls: ['./short-day.component.scss'],
})
export class ShortDayComponent implements OnInit {
  @Input('date') date!: CalendarDate;
  @Input('data') data!: Map<string, calendar.task.Type[]>;

  get tasks() {
    console.log(this.date.date);

    return this.data.get(this.date.date);
  }

  constructor() {}

  ngOnInit(): void {}
}
