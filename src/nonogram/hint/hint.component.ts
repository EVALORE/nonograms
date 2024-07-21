import { BaseComponent, bcToFc } from '@control.ts/min';
import { type HintModel } from '.';

export class HintComponent extends BaseComponent<HTMLTableCellElement> {
  constructor(private readonly hintModel: HintModel) {
    super({
      tag: 'td',
      className: 'cell',
    });

    this.setTextContent(String(hintModel.value === 0 ? '' : hintModel.value));

    if (hintModel.value === 0) {
      return;
    }
    this.setLeftClickListener(this.hintModel.handleClick);
    this.setRightClickListener(this.hintModel.handleClick);
  }

  public setRightClickListener(rightClickHandler: () => void): void {
    this.on('contextmenu', (event: Event) => {
      event.preventDefault();
      rightClickHandler();
      this.handleClueState();
    });
  }

  public setLeftClickListener(leftClickHandler: () => void): void {
    this.on('click', () => {
      leftClickHandler();
      this.handleClueState();
    });
  }

  private handleClueState(): void {
    if (this.hintModel.state === 'crossed') {
      this.handleClueCrossing();
    }
    if (this.hintModel.state === 'unsolved') {
      this.handleClueUnsolved();
    }
  }

  private handleClueCrossing(): void {
    this.addClass('crossed');
  }

  private handleClueUnsolved(): void {
    this.removeClass('crossed');
  }
}

export const hint = bcToFc(HintComponent);
