import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-working-shifts',
  templateUrl: './working-shifts.component.html',
  styleUrls: ['./working-shifts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkingShiftsComponent {
  isModalOpen = false;
  constructor() {}
  setOpen(isOpen: boolean) {
    console.log('fgdgdg');

    this.isModalOpen = isOpen;
  }
}
