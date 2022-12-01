import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, filter, map, of, switchMap, tap } from 'rxjs';
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
import { CalendarDate } from '../../common/calendar-date';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {
  isModalOpen = false;
  public form!: FormGroup;
  amount!: calendar.task.Shift;

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

  public targetTime(d: string): string {
    const date = new Date(d);
    return CalendarDate.getTime(date);
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
     *
     */

    combineLatest([this.form.controls['type'].valueChanges, this.selectedDate$])
      .pipe(
        tap(([type, date]) => console.log([type, date])),
        filter(([type, date]) => !!date?.currentDate)
      )
      .subscribe(([type, date]) => {
        const _date = date!.currentDate;

        _date!.setHours(8, 0, 0);

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
        if (!this.form.get('text') && type !== TypeTask.shift) {
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
          type !== TypeTask.note &&
          type !== TypeTask.shift
        ) {
          console.log(_date.toISOString());
          this.form.addControl(
            'targetDate',
            this._fb.control(_date.toISOString(), [Validators.required])
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
              this._fb.control(_date.toISOString(), [Validators.required])
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
        /**
         * сумма за день
         */
        this.form.controls['type'].value === TypeTask.shift
          ? this.form.addControl(
              'amount',
              this._fb.control('', [Validators.required])
            )
          : this.form.removeControl('amount');
      });

    console.log(this.form);

    this.form.controls['type'].valueChanges
      .pipe(
        filter((t) => t === 'shift'),
        switchMap((t) =>
          combineLatest([
            this.form.controls['duration'].valueChanges,
            this.form.controls['hourlyRate'].valueChanges,
            of(t),
          ])
        ),
        tap(([d, h, t]) => console.log([d, h, t]))
      )
      .subscribe(([d, h, t]) => {
        const time = d!.split(':');
        const hours = +((+time[0] * 60 + +(+time[1])) / 60).toFixed(2);
        const sum = hours * +h;
        this.form.controls['amount'].patchValue(sum);
        console.log(this.form.controls['amount'].value);
      });
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
      console.log(data.get(d!.date));
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

  public clearForm(): void {
    Object.keys(this.form).forEach((key) => {
      this.form.controls[key].patchValue(null);
    });
  }

  clearDate(): void {
    this.router.navigate([], {
      queryParams: {
        day: null,
      },
      queryParamsHandling: 'merge',
    });
    this.service.day = null;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.form.controls['type'].patchValue('');
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
    this.dataService.createTask(data, date, type);
    this.setOpen(false);
  }
}
