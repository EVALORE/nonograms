import { type CellCoords, type CellStates } from './cell.type';
import { Observable } from '@shared/observer';

export class CellModel extends Observable<CellCoords> {
  public state: CellStates = 'empty';
  public readonly xCoord: number;
  public readonly yCoord: number;

  constructor(xCoord: number, yCoord: number) {
    super();
    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }

  public handleLeftClick = (): void => {
    this.state = this.state === 'empty' || this.state === 'crossed' ? 'filled' : 'empty';
    this.notify({ xCoord: this.xCoord, yCoord: this.yCoord });
  };

  public handleRightClick = (): void => {
    this.state = this.state === 'empty' || this.state === 'filled' ? 'crossed' : 'empty';
    this.notify({ xCoord: this.xCoord, yCoord: this.yCoord });
  };
}
