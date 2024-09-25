export enum AppRoute {
  main = 'main',
  levels = 'levels',
  game = 'game',
}

export interface Route {
  name: AppRoute;
  component: () => HTMLElement;
}

export function changeWindowLocation(route: AppRoute): void {
  window.location.hash = `#${route}`;
}

export class Router {
  constructor(
    private readonly routes: Route[],
    private onHashChange: (route: Route) => void,
    private defaultComponent?: () => HTMLElement,
  ) {
    window.addEventListener('hashchange', this.onHashChangeHandler.bind(this));
    this.onHashChangeHandler();
  }
  public destroy(): void {
    window.removeEventListener('hashchange', this.onHashChangeHandler.bind(this));
  }

  private onHashChangeHandler(): void {
    const path = window.location.hash.slice(1);
    const currentRoute = this.routes.find((route) => route.name === (path as AppRoute));
    this.onHashChange(
      currentRoute ?? ({ name: AppRoute.main, component: this.defaultComponent } as Route),
    );
  }
}
