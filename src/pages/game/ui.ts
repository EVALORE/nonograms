import { BaseComponent } from '@shared/ui';
import { nonogramUI } from '@src/widgets/nonogram';

export class Game extends BaseComponent {
  constructor() {
    super({ tagName: 'div', classNames: ['game'] });
    this.insertChild(new nonogramUI.Table());
  }
}
