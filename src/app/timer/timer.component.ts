import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { TimerState } from '../shared/TimerState.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnDestroy {

  private _startTime: number;
  private _currentState: TimerState;

  private _workTimer: Subscription;
  private _waitTimer: Subscription;

  private _isClicked: boolean;

  public timer: number;

  constructor() {
    this._startTime = 0;
    this.timer = this._startTime;
    this._isClicked = false;
    this._currentState = TimerState.Stopped;
  }

  run(): void {
    switch (this._currentState) {
      case TimerState.Stopped:
        this._currentState = TimerState.Working;
        this._workTimer = interval(1000).subscribe(() => {
          this.timer++;
        });
        break;
      case TimerState.Working:
        this.stop();
    }
  }
  getIcon(): string {
    switch (this._currentState) {
      case TimerState.Stopped:
        return 'play';
      case TimerState.Working:
        return 'stop';
    }
  }


  wait(): void {
    if (!this._isClicked) {
      this._isClicked = true;
      this._waitTimer = timer(300).subscribe(() => {
        this._isClicked = false;
        this._waitTimer.unsubscribe();
      });
    } else {
      this._waitTimer.unsubscribe();
      this._isClicked = false;
      this.stop();
    }
  }

  reset(): void {
    this.stop();
    this.timer = this._startTime;
  }

  private stop(): void {
    if (this._workTimer) {
      this._workTimer.unsubscribe();
    }
    this._currentState = TimerState.Stopped;
  }

  ngOnDestroy(): void {
    if (this._workTimer) {
      this._workTimer.unsubscribe();
      delete this._workTimer;
    }
    if (this._waitTimer) {
      this._waitTimer.unsubscribe();
      delete this._waitTimer;
    }
  }
}
