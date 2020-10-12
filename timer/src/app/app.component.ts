import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject, timer } from 'rxjs';
import { buffer, debounceTime, filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentTime = 0;

  private source$ = timer(0, 1000);
  private onDestroyed$ = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
    const clicks$ = fromEvent(document.querySelector('.wait-btn'), 'click');

    clicks$.pipe(
      buffer(clicks$.pipe(debounceTime(300))),
      filter(value => value.length > 1)
    ).subscribe(() => this.onDestroyed$.next());
  }

  startTimer(startFrom: number): void {
    this.source$.pipe(
      takeUntil(this.onDestroyed$),
      tap(value => this.currentTime = value + startFrom)
    ).subscribe();
  }

  stopTimer(): void {
    this.onDestroyed$.next();
    this.currentTime = 0;
  }

  resetTimer(): void {
    this.currentTime = 0;
  }

  ngOnDestroy(): void {
    this.onDestroyed$.next();
    this.onDestroyed$.complete();
  }
}
