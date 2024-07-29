export type CellStates = 'empty' | 'filled' | 'crossed';

export interface CellCoords {
  colIndex: number;
  rowIndex: number;
}

export class CellModel {
  public state: CellStates = 'empty';

  public onStateChange: () => void;

  constructor(onStateChange: () => void) {
    this.onStateChange = onStateChange;
  }

  public toggleFill = (): void => {
    this.updateState(this.state === 'filled' ? 'empty' : 'filled');
  };

  public toggleCross = (): void => {
    this.updateState(this.state === 'crossed' ? 'empty' : 'crossed');
  };

  private updateState(state: CellStates): void {
    this.state = state;
    this.onStateChange();
  }
}
