import { BaseComponent, button } from '@control.ts/min';
import { ModalComponent } from '@entities';
import { AppRoute, changeLocation, StateService, templateData } from '@shared';
import { NonogramComponent, NonogramModel } from '@widget';

export class GamePage extends BaseComponent<HTMLDivElement> {
  private nonogramComponent: NonogramComponent;
  private readonly currentTemplate: templateData | null;
  constructor(state: StateService) {
    super({
      tag: 'div',
      className: 'game-page',
    });

    this.currentTemplate = state.getCurrentLevel();
    if (this.currentTemplate === null) {
      changeLocation(AppRoute.levels);
    }

    this.nonogramComponent = new NonogramComponent(new NonogramModel(this.currentTemplate!));
    this.append(this.nonogramComponent);
    this.append(
      new ModalComponent(
        'game',
        'Congratulations!',
        button({
          txt: 'back to levels list',
          onclick: () => {
            changeLocation(AppRoute.levels);
          },
        }),
      ),
    );
  }
}
