import { BaseComponent } from '@control.ts/min';
import { LevelsListComponent } from '@features';
import { changeLocation, StateService, AppRoute, templateData } from '@shared';

export class LevelsPage extends BaseComponent<HTMLDivElement> {
  private levelsListComponent: LevelsListComponent;

  private readonly state: StateService;
  constructor(state: StateService) {
    super({
      tag: 'div',
      className: 'levels-page',
    });
    this.state = state;

    this.levelsListComponent = new LevelsListComponent((level: templateData) => {
      this.state.setCurrentLevel(level);
      changeLocation(AppRoute.game);
    });
    this.append(this.levelsListComponent);
  }
}
