import { BaseComponent } from '@shared/ui';
import type { CellStates } from '../../types';

export class Cell extends BaseComponent<'td'> {
  constructor() {
    super({ tagName: 'td' });
  }

  public setRightClickListener(rightClickHandler: () => void): void {
    this.addListener('contextmenu', rightClickHandler);
  }

  public setLeftClickListener(leftClickHandler: () => void): void {
    this.addListener('click', leftClickHandler);
  }

  public changeCellState(state: CellStates): void {
    if (state === 'filled') this.handleCellFilling();
    if (state === 'crossed') this.handleCellCrossing();
  }

  private handleCellFilling(): void {
    this.removeClass('crossed');
    this.toggleClass('filled');
  }

  private handleCellCrossing(): void {
    this.removeClass('filled');
    this.toggleClass('crossed');
  }
}
