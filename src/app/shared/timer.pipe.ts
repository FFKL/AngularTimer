import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {
  transform(timerSeconds: number): string {
    if (timerSeconds < 0) {
      return '00:00:00';
    }
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = Math.floor(timerSeconds % 60);
    return `${buildTimerSection(hours)}:${buildTimerSection(minutes)}:${buildTimerSection(seconds)}`;

    function buildTimerSection(t) {
      return t < 10 ? `0${t}` : t;
    }
  }
}
