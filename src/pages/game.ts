import { BaseComponent } from '@control.ts/min';
import { LevelsComponent } from '@features/levels';
import { NonogramComponent, NonogramModel } from '@widget/nonogram';
import { template } from '@widget/nonogram/api/templateExample';

export class GamePage extends BaseComponent<HTMLDivElement> {
  private readonly levelsComponent: LevelsComponent;
  private nonogramComponent: NonogramComponent;
  constructor() {
    super({
      tag: 'div',
      className: 'game-page',
    });

    this.nonogramComponent = new NonogramComponent(
      new NonogramModel({
        id: -1,
        difficulty: '',
        name: '',
        columns: 7,
        rows: 6,
        puzzle: template,
      }),
    );
    this.levelsComponent = new LevelsComponent(() => {
      const newNonogram = new NonogramModel(this.levelsComponent.currentLevel);
      this.nonogramComponent.setNewTemplate(newNonogram);
    });

    this.appendChildren([this.levelsComponent, this.nonogramComponent]);
  }
}
