import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// создать блок, в который нужно отобразить три значения из observable, каждое значение должно быть n * 10
// Добавить кнопку -, которая будет уменьшать на 1
// Создать инпут, в который можно передать произвольное число и менять его в _count$
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ng-calendar';
  public count = 5;

  private readonly _count$ = new BehaviorSubject<number>(1);
  public count$: Observable<number | undefined> | undefined; 

  ngOnInit(): void {
    this.count$ = this._count$;
    this._count$.subscribe((val) => {
      this.logIncrement(val);
    })
  }

  ngAfterViewInit(): void {
  
  }

  logIncrement(val: number) {
    console.log(val * 2);
  }

  increment() {
    this._count$.next(this._count$.value + 1)
  }

}
