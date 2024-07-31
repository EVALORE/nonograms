import { Observable, templateData } from '@shared';

export const template = {
  id: -1,
  name: 'default',
  difficulty: 'easy',
  columns: 7,
  rows: 6,
  puzzle: [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
  ],
};

export class GameService extends Observable<string> {
  private currentLevel: templateData | null = template;
  private state: 'solved' | 'unsolved' = 'unsolved';

  public getCurrentLevel(): templateData | null {
    return this.currentLevel;
  }

  public setCurrentLevel(level: templateData): void {
    this.currentLevel = level;
  }

  public setState(state: 'solved' | 'unsolved'): void {
    this.state = state;
    if (state === 'solved') {
      this.notify(this.state);
    }
  }
}
