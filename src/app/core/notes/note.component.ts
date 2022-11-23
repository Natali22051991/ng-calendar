import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service';
import { DataService } from 'src/app/services/data-service';
import { KeyValue } from '@angular/common';
import {
  TypeTask,
  TypeTaskDictionary,
  TypeTaskTargetDate,
  TypeTaskText,
} from '../../models/type-task';
import { Shifts } from 'src/app/models/shifts';
import { calendar } from 'src/app/models/calendar';
import { CalendarNote } from 'src/app/common/calendar-note';
import { CalendarTask } from 'src/app/common/calendar-task';
import { CalendarEvent } from 'src/app/common/calendar-event';
import { CalendarShift } from 'src/app/common/calendar-shift';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  isActive: boolean = true;
  isModalOpen = false;
  public form!: FormGroup;

  /**
   *получение названия для поля title
   */
  public get placeHolderTitle() {
    const type = this.form.value.type;
    return 'Название ' + TypeTaskDictionary[type as keyof Object];
  }
  /**
   *получение названия для поля text
   */
  public get placeHolderText() {
    const type = this.form.value.type;
    return 'Добавить ' + TypeTaskText[type as keyof Object];
  }
  /**
   *получение названия для поля targetDate
   */
  public get placeHolderTargetDate() {
    const type = this.form.value.type;
    return 'Укажите ' + TypeTaskTargetDate[type as keyof Object];
  }
  constructor(
    private service: CalendarService,
    private router: Router,
    private dataService: DataService,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      type: '',
    });
    /**
     * подписка на изменения поля выбора типов
     */
    this.form.controls['type'].valueChanges.subscribe((data: TypeTask) => {
      /**
       *очищение общих контроллов
       */
      this.form.removeControl('title');
      this.form.removeControl('text');
      this.form.removeControl('targetDate');

      /**
       * контроллы общие
       * название
       */
      if (!this.form.get('title')) {
        this.form.addControl(
          'title',
          this._fb.control('', [Validators.required])
        );
      }

      /**
       * текст
       */
      if (!this.form.get('text') && data !== TypeTask.shift) {
        this.form.addControl(
          'text',
          this._fb.control('', [Validators.required])
        );
      }
      /**
       * дата выполнения
       */
      if (
        !this.form.get('targetDate') &&
        data !== TypeTask.note &&
        data !== TypeTask.shift
      ) {
        this.form.addControl(
          'targetDate',
          this._fb.control('2022-11-23T11:00:00+03:00', [Validators.required])
        );
      }
      /**
       * контроллы для события
       * тип события
       */
      this.form.controls['type'].value === TypeTask.event
        ? this.form.addControl(
            'eventType',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('eventType');

      /**
       * контроллы для смены
       * выбор смены
       */
      this.form.controls['type'].value === TypeTask.shift
        ? this.form.addControl(
            'description',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('description');
      /**
       * описание смены
       */

      this.form.controls['type'].value === TypeTask.shift
        ? this.form.addControl(
            'start',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('start');
      /**
       * продолжительность смены
       */
      this.form.controls['type'].value === TypeTask.shift
        ? this.form.addControl(
            'duration',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('duration');
      /**
       * почасова ставка
       */
      this.form.controls['type'].value === TypeTask.shift
        ? this.form.addControl(
            'hourlyRate',
            this._fb.control('', [Validators.required])
          )
        : this.form.removeControl('hourlyRate');
    });

    console.log(this.selectedDate$);
  }

  public selectedDay$ = this.service.selectedDate$;
  public selectedDate$ = this.service.selectedDate$;
  // :calendar.task.Note|calendar.task.Event |calendar.task.WorkingShift |calendar.task.Task
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
      key: TypeTask.shift,
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
        day: null,
      },
      queryParamsHandling: 'merge',
    });
    this.service.day = null;
  }

  add(): void {
    this.isActive = false;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  onSubmit(date: string) {
    const type = this.form.value.type;
    let data!: calendar.task.Type;
    if (type === TypeTask.note) {
      data = new CalendarNote(this.form.value);
    } else if (type === TypeTask.task) {
      data = new CalendarTask(this.form.value);
    } else if (type === TypeTask.event) {
      data = new CalendarEvent(this.form.value);
    } else if (type === TypeTask.shift) {
      data = new CalendarShift(this.form.value);
    }
    console.log(data);
    this.dataService.createTask(data, date, type);
  }
}
