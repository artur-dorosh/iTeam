import {Component} from '@angular/core';
import {Observable, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Timer';
  currentTime = '00:00:00';

  currentValue = 0;
  clicks = 0;

  source$: Observable<number>;
  timer$: Subscription;

  constructor() {
    this.source$ = timer(0, 1000);
  }

  getCurrentTime(date: Date): string {
    let currentHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let currentMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let currentSeconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return `${currentHours}:${currentMinutes}:${currentSeconds}`;
  }

  startTimer(startFrom: number): void {
    this.timer$ = this.source$.subscribe(vl => {
        this.currentTime = this.getCurrentTime(new Date(0, 0, 0 , 0, 0, vl + startFrom))
        this.currentValue = vl + startFrom;
      }
    );
  }

  stopTimer(): void {
    this.timer$.unsubscribe();
    this.currentTime = '00:00:00';
    this.currentValue = 0;
  }

  pauseTimer(): void {
    this.clicks++;
    if (this.clicks === 1) {
      setTimeout(() => {
        if (this.clicks > 1) {
          this.timer$.unsubscribe();
        }
        this.clicks = 0;
      }, 300)
    }
  }

  resetTimer(): void {
    this.currentTime = '00:00:00';
    this.currentValue = 0;
  }
}
