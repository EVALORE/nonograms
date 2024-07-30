import { BaseComponent } from '@control.ts/min';

export class LevelsPage extends BaseComponent<HTMLDivElement> {
  constructor() {
    super({
      tag: 'div',
      className: 'levels-page',
    });
  }
}
