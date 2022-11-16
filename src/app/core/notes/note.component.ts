import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, first, map, tap } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  isActive: boolean = true;
  text: string = '';

  constructor(
    private service: CalendarService,
    private router: Router,
    private dataService: DataService
  ) {
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
    ).subscribe((key: string) => this.dataService.saveSubmit(text, key));
  }
}
