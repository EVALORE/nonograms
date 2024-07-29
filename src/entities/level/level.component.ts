import { BaseComponent, BaseComponentChild } from '@control.ts/min';

export class LevelComponent extends BaseComponent<HTMLDivElement> {
  constructor(onclick: () => void, ...content: NonNullable<BaseComponentChild>[]) {
    super(
      {
        tag: 'div',
        className: 'level',
        onclick,
      },
      ...content,
    );
  }
}
