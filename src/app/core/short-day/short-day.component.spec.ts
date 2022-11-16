import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortDayComponent } from './short-day.component';

describe('ShortDayComponent', () => {
  let component: ShortDayComponent;
  let fixture: ComponentFixture<ShortDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShortDayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
