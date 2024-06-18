import { Game } from '@pages/game';

class App {
  private page: Game = new Game();
  private rootElement: HTMLElement = document.body;

  public startApp(): void {
    this.rootElement.append(this.page.getNode());
  }
}

new App().startApp();
