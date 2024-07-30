import { BaseComponent, div, span } from '@control.ts/min';
import { templateData, templates } from '@shared';

export class LevelsListComponent extends BaseComponent {
  private readonly templates: templateData[] = templates;

  constructor(private readonly onSetLevel: (level: templateData) => void) {
    super({
      tag: 'div',
      className: 'levels',
    });

    this.renderLevels();
  }

  public renderLevels(): void {
    this.templates.forEach((template) => {
      this.append(
        div(
          {
            className: 'level',
            onclick: () => {
              this.onSetLevel(template);
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
