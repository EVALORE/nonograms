import { BaseComponent } from '@control.ts/min';

export class TimerComponent extends BaseComponent<HTMLDivElement> {
  public timer = 0;

  constructor() {
    super({
      tag: 'div',
      className: 'timer',
      txt: '00:00',
    });
  }

  public startTimer(): void {
    this.timer = 0;
    this.updateTimerText();
    setInterval(() => {
      this.timer += 1000;
      this.updateTimerText();
    }, 1000);
  }

  public stopTimer(): void {
    clearInterval(this.timer);
  }

  private updateTimerText(): void {
    const seconds = Math.floor(this.timer / 1000);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    this.setTextContent(`${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`);
  }
}
