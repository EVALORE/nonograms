import { templateAPI } from '@features/levels';
import { Observable } from '@shared/observer';

class StateService extends Observable<templateAPI> {
  private currentLevel: templateAPI | null = null;

  public getCurrentLevel(): templateAPI | null {
    return this.currentLevel;
  }

  public setCurrentLevel(level: templateAPI): void {
    this.currentLevel = level;
  }
}

export const stateService = new StateService();
