import { BaseComponent, div, span } from '@control.ts/min';
import templates from './api/templates.json';

export interface templateAPI {
  id: number;
  name: string;
  difficulty: string;
  columns: number;
  rows: number;
  puzzle: number[][];
}

export class LevelsComponent extends BaseComponent {
  private readonly templates = templates;

  private currentLevelId = -1;

  constructor(private readonly onLevelSet: () => void) {
    super({
      tag: 'div',
      className: 'levels',
    });

    this.renderLevels();
  }

  public get currentLevel(): templateAPI {
    if (this.currentLevelId === -1) {
      return this.templates[0]!;
    }
    return this.templates[this.currentLevelId]!;
  }

  public renderLevels(): void {
    this.templates.forEach((template) => {
      this.append(
        div(
          {
            className: 'level',
            onclick: () => {
              this.currentLevelId = template.id;
              this.onLevelSet();
            },
          },
          span({ className: 'level-name', txt: template.name }),
          span({ className: 'level-difficulty', txt: template.difficulty }),
          span({ className: 'level-size', txt: `${template.columns}x${template.rows}` }),
        ),
      );
    });
  }
}
