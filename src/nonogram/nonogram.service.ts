import { type CellCoords } from './cell';
import { type NonogramGrid } from './types/templateValues';
import { NonogramModel } from './nonogram.model';
import { type Observer } from '@shared/observer';
import { areValidSequences } from './lib';

export class NonogramService implements Observer<CellCoords> {
  private readonly model: NonogramModel;
  constructor(template: NonogramGrid) {
    this.model = new NonogramModel(template);

    this.model.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.attach(this);
      });
    });
  }

  public changeCellValue(value: CellCoords): void {
    const newValue = this.model.getCellState(value.xCoord, value.yCoord) === 'filled' ? 0 : 1;
    this.model.setCellValue(value.xCoord, value.yCoord, newValue);
  }

  public compareSequences(cellCoords: CellCoords): boolean {
    return areValidSequences(this.model.PlayerCellsValues, this.model.template, cellCoords);
  }

  public update(value: CellCoords): void {
    this.changeCellValue(value);
  }
}
