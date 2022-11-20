import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, first, map, tap } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service';
import { DataService } from 'src/app/services/data-service';
import { KeyValue } from '@angular/common';
import { TypeTask } from '../../models/type-task';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  isActive: boolean = true;
  text: string = '';

  public form!: FormGroup;

  constructor(
    private service: CalendarService,
    private router: Router,
    private dataService: DataService,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      type: ''
    })
    // подписка на изменения поля выбора типов
    this.form.controls['type'].valueChanges.subscribe((data: TypeTask) => {
      // здесь описать логику смены полей при изменении типа
      console.log(data);
      /*
      this.form.addControl(...)
       */
      // также не забывать удалять поля при смене типа
      /*
      this.form.removeControl(...)
      */
    });
    console.log(this.selectedDate$);
  }

  public selectedDay$ = this.service.selectedDate$;
  public selectedDate$ = this.service.selectedDate$;
  public data$ = combineLatest([
    this.dataService.data$.pipe(tap((e) => console.log(e))),
    this.selectedDay$
  ]).pipe(
    map(([data, d]) => {
      if (d === null) {
        return;
      }
      return data.get(d!.date);
    })
  );
  types: KeyValue<TypeTask, string>[] = [{
    key: TypeTask.note,
    value: 'Заметка'
  }, {
    key: TypeTask.task,
    value: 'Задача'
  }, {
    key: TypeTask.event,
    value: 'Событие'
  }, {
    key: TypeTask.workingShift,
    value: 'Рабочая смена'
  }];

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
    this.service.selectedDate$.pipe(
      map((d) => d!.date),
      first()
    ).subscribe((key: string) => {
      /*this.dataService.createTask(text, key)*/
    });
  }
}
