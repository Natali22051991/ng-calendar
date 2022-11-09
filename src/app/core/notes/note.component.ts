import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  dayData!: string[];

  constructor(
    private service: CalendarService,
    private router: Router,
    private dataServise: DataService
  ) {}

  public divDay = this.dataServise.divDay;
  public selectedDay$ = this.service.selectedDate$;
  public selectedMonth$ = this.service.selectedMonth$;
  public selectedYear$ = this.service.selectedYear$;
  public selectedDate$ = this.service.selectedDate$;
  public data$ = this.dataServise.data$;

  clearDate(): void {
    this.router.navigate([], {
      queryParams: {
        day: null,
      },
    });
  }

  add(): void {
    this.isActive = false;
  }

  saveSubmit(text: string) {
    this.isActive = true;
    this.dataServise.saveSubmit(text);
  }
}
