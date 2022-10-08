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
  name = '';
  name1= '';

  private readonly _count$ = new BehaviorSubject<number>(1);
  private readonly _count1$ = new BehaviorSubject<number>(this._count$.value * 10);
  private readonly _count2$ = new BehaviorSubject<number>(this._count$.value * 100);
  private readonly _val$ = new BehaviorSubject<number>(this._count$.value*100);

  // значение из первого поля
  public readonly firstInputValue$ = new ReplaySubject<string>();
  public readonly secondInputValue$ = new ReplaySubject<string>(+this.name);
  public readonly thirdInputValue$ = new ReplaySubject<string>(+this.name1);


  public count$: Observable<number | undefined> | undefined;
  public count1$: Observable<number | undefined> | undefined;
  public count2$: Observable<number | undefined> | undefined;

  ngOnInit(): void {
    this.count$ = this._count$;
    this.count1$ = this._count1$;
    this.count2$ = this._count2$;

    this._count$.subscribe((val) => {
      this.logIncrement(val);
      this._count1$.next(val * 10);
      this._count2$.next(val * 100);
    })
  }

  ngAfterViewInit(): void {
  }

  logIncrement(val: number) {
    console.log(val * 10);
  }

  increment() {
    this._count$.next(+this._count$.value + 1)
  }

  decrement() {
    this._count$.next(+this._count$.value - 1)
  }



  handlerFirstInput(val: string) {
    console.log(val);
    this.firstInputValue$.next(val);
  }
  handlerSecondInput(val: string) {
    console.log(val);
    this.secondInputValue$.next(val);
  }

  handlerThirdInput(val: string) {
    console.log(val);
    this.thirdInputValue$.next(val);
  }

clearInput(val: string){
    this.thirdInputValue$.next('') ;
    this.name1 = '';
}

}

