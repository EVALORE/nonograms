import { BaseComponent, button } from '@control.ts/min';
import { ModalComponent } from '@entities';
import { AppRoute, changeLocation, GameService, templateData } from '@shared';
import { NonogramComponent, NonogramModel } from '@widget';

export class GamePage extends BaseComponent<HTMLDivElement> {
  private nonogramComponent: NonogramComponent;
  private readonly currentTemplate: templateData | null;
  constructor(gameService: GameService) {
    super({
      tag: 'div',
      className: 'game-page',
    });

    this.currentTemplate = gameService.getCurrentLevel();
    if (this.currentTemplate === null) {
      changeLocation(AppRoute.levels);
    }

    gameService.subscribe(this.showModal);

    this.nonogramComponent = new NonogramComponent(
      new NonogramModel(this.currentTemplate!, () => {
        gameService.setState('solved');
      }),
    );
    this.append(this.nonogramComponent);
  }

  private showModal = (): void => {
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
  };
}
