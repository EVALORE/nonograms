import { mount } from '@control.ts/min';
import { MainPage, GamePage, LevelsPage } from '@pages';

import { AppRoute, Route, Router } from '@shared/router';

class App {
  private routes: Route[] = [
    {
      name: AppRoute.main,
      component: () => new MainPage().node,
    },
    {
      name: AppRoute.levels,
      component: () => new LevelsPage().node,
    },
    {
      name: AppRoute.game,
      component: () => new GamePage().node,
    },
  ];
  private defaultRouter = this.routes[0]?.component;
  private router!: Router;

  public createRouter(): void {
    this.router = new Router(this.routes, this.mountPage, this.defaultRouter);
    this.router.destroy();
  }

  public destroyRouter(): void {
    this.router.destroy();
  }

  private mountPage = (route: Route): void => {
    mount(document.body, route.component());
  };
}

const app = new App();
app.createRouter();
