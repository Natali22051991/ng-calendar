import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service';
import { DataService } from 'src/app/services/data-service';
import { KeyValue } from '@angular/common';
import { TypeTask } from '../../models/type-task';
import { Shifts } from 'src/app/models/shifts';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  isActive: boolean = true;
  @Input('info') info!: string;
  public form!: FormGroup;
  // public info$ = new BehaviorSubject(<string[]>);
  constructor(
    private service: CalendarService,
    private router: Router,
    private dataService: DataService,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      type: '',
    });
    // подписка на изменения поля выбора типов
    this.form.controls['type'].valueChanges.subscribe((data: TypeTask) => {
      // здесь описать логику смены полей при изменении типа
      console.log(data);
      /**
       * контроллы для заметки
       */
      this.form.controls['type'].value === 'note'
        ? this.form.addControl(
            'titleNote',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('titleNote');
      this.form.controls['type'].value === 'note'
        ? this.form.addControl(
            'note',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('note');
      /**
       * контроллы для задачи
       */
      this.form.controls['type'].value === 'task'
        ? this.form.addControl(
            'titleTask',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('titleTask');

      this.form.controls['type'].value === 'task'
        ? this.form.addControl(
            'task',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('task');
      this.form.controls['type'].value === 'task'
        ? this.form.addControl(
            'targetDate',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('targetDate');

      /**
       * контроллы для события
       */

      this.form.controls['type'].value === 'event'
        ? this.form.addControl(
            'titleEvent',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('titleEvent');

      this.form.controls['type'].value === 'event'
        ? this.form.addControl(
            'event',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('event');

      this.form.controls['type'].value === 'event'
        ? this.form.addControl(
            'targetDateEvent',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('targetDateEvent');
      /**
       * контроллы для смены
       */

      this.form.controls['type'].value === 'working-shift'
        ? this.form.addControl(
            'titleWorkingShift',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('titleWorkingShift');
      this.form.controls['type'].value === 'working-shift'
        ? this.form.addControl(
            'workingShift',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('workingShift');
      this.form.controls['type'].value === 'working-shift'
        ? this.form.addControl(
            'targetStartTimeWorkingShift',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('targetStartTimeWorkingShift');
      this.form.controls['type'].value === 'working-shift'
        ? this.form.addControl(
            'targetAndTimeWorkingShift',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('targetAndTimeWorkingShift');
    });

    console.log(this.selectedDate$);
  }
  public selectedDay$ = this.service.selectedDate$;
  public selectedDate$ = this.service.selectedDate$;
  public data$ = combineLatest([
    this.dataService.data$.pipe(tap((e) => console.log(e))),
    this.selectedDay$,
  ]).pipe(
    map(([data, d]) => {
      if (d === null) {
        return;
      }
      return data.get(d!.date);
    })
  );
  types: KeyValue<TypeTask, string>[] = [
    {
      key: TypeTask.note,
      value: 'Заметка',
    },
    {
      key: TypeTask.task,
      value: 'Задача',
    },
    {
      key: TypeTask.event,
      value: 'Событие',
    },
    {
      key: TypeTask.workingShift,
      value: 'Рабочая смена',
    },
  ];

  shifts: KeyValue<string, string>[] = [
    {
      key: Shifts.fiveInTwo,
      value: 'График 5/2',
    },
    {
      key: Shifts.fourInTwo,
      value: 'График 4/2',
    },
    {
      key: Shifts.threeInTwo,
      value: 'График 3/2',
    },
    {
      key: Shifts.twoInTwo,
      value: 'График 2/2',
    },
    {
      key: Shifts.setManually,
      value: 'выставить вручную',
    },
  ];

  clearDate(): void {
    this.router.navigate([], {
      queryParams: {
        day: '',
      },
    });
  }

  add(): void {
    this.isActive = false;
  }
  onSubmit() {
    console.log(this.form.value);
    // this.info$.next(this.info$.value);
    // console.log(this.info$.value);
  }
}
