import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, first, map, tap } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  isActive: boolean = true;
  text: string = '';

  constructor(
    private service: CalendarService,
    private router: Router,
    private dataServise: DataService
  ) {
    console.log(this.selectedDate$);
  }

  public selectedDay$ = this.service.selectedDate$;
  public selectedDate$ = this.service.selectedDate$;
  public data$ = combineLatest([
    this.dataServise.data$.pipe(tap((e) => console.log(e))),
    this.selectedDay$,
  ]).pipe(
    map(([data, d]) => {
      if (d === null) {
        return;
      }
      return data.get(d!.date);
    })
  );

  clearDate(): void {
    this.router.navigate([], {
      queryParams: {
        day: null,
      },
    });
    console.log(this.router);
  }

  add(): void {
    this.isActive = false;
  }

  saveSubmit(text: string) {
    this.isActive = true;
    this.dataServise.selectedDay$
      .pipe(
        map((d) => d!.date),
        first()
      )
      .subscribe((key: string) => this.dataServise.saveSubmit(text, key));
  }
}
