import { BaseComponent } from '@control.ts/min';
import { LevelsComponent } from '@features';
import { NonogramComponent, NonogramModel } from '@widget';

export class GamePage extends BaseComponent<HTMLDivElement> {
  private readonly levelsComponent: LevelsComponent;
  private nonogramComponent: NonogramComponent;
  constructor() {
    super({
      tag: 'div',
      className: 'game-page',
    });

    this.nonogramComponent = new NonogramComponent();
    this.levelsComponent = new LevelsComponent(() => {
      this.init();
    });

    this.appendChildren([this.levelsComponent, this.nonogramComponent]);
  }

  public init(): void {
    const newNonogram = new NonogramModel(this.levelsComponent.currentLevel);
    this.nonogramComponent.setTemplate(newNonogram);
  }
}
