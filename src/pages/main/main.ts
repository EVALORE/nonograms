import { BaseComponent, div, h1 } from '@control.ts/min';
import { AppRoute, changeLocation } from '@shared';

export class MainPage extends BaseComponent<HTMLDivElement> {
  constructor() {
    super(
      {
        tag: 'div',
        className: 'page',
      },
      h1({ txt: 'Nonogram' }),
      div({
        txt: 'Play',
        onclick: () => {
          changeLocation(AppRoute.levels);
        },
      }),
    );
  }
}
