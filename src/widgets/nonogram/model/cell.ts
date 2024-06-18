import { type nonogramTypes } from '..';

export class CellModel {
  public state: nonogramTypes.CellStates = 'empty';

  public handleRightClick = (event: MouseEvent): void => {
    event.preventDefault();
    this.state = this.state === 'empty' ? 'filled' : 'empty';
  };

  public handleLeftClick = (): void => {
    this.state = this.state === 'filled' ? 'crossed' : 'filled';
  };
}
