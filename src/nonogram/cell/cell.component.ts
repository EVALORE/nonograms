import { BaseComponent, bcToFc } from '@control.ts/min';
import { type CellModel } from './cell.model';

export class CellComponent extends BaseComponent<HTMLTableCellElement> {
  constructor(private readonly cellModel: CellModel) {
    super({
      tag: 'td',
      className: 'cell',
    });

    this.setRightClickListener(this.cellModel.handleRightClick);
    this.setLeftClickListener(this.cellModel.handleLeftClick);
  }

  public setRightClickListener(rightClickHandler: () => void): void {
    this.on('contextmenu', (event: Event) => {
      event.preventDefault();
      rightClickHandler();
      this.handleCellState();
    });
  }

  public setLeftClickListener(leftClickHandler: () => void): void {
    this.on('click', () => {
      leftClickHandler();
      this.handleCellState();
    });
  }

  public handleCellState(): void {
    if (this.cellModel.state === 'filled') {
      this.handleCellFilling();
    }
    if (this.cellModel.state === 'crossed') {
      this.handleCellCrossing();
    }
    if (this.cellModel.state === 'empty') {
      this.handleCellEmpty();
    }
  }
  public handleCellEmpty(): void {
    this.removeClass('filled');
    this.removeClass('crossed');
  }

  public handleCellFilling(): void {
    this.removeClass('crossed');
    this.addClass('filled');
  }

  public handleCellCrossing(): void {
    this.removeClass('filled');
    this.addClass('crossed');
  }
}

export const cell = bcToFc(CellComponent);
