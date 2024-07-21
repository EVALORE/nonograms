import { type CellCoords, type CellModel } from './cell';
import { areGridsEqual, areValidSequences } from './lib';
import { type HintModel } from './hint';
import { type NonogramModel } from './nonogram.model';
import { type Observer } from '@shared/observer';

export class NonogramService implements Observer<CellCoords> {
  constructor(private readonly nonogram: NonogramModel) {
    this.nonogram.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.attach(this);
      });
    });
  }

  public get templateRows(): number {
    return this.nonogram.templateRows;
  }

  public get templateColumns(): number {
    return this.nonogram.templateColumns;
  }

  public get lengthOfColumnHints(): number {
    return this.nonogram.maxLengthOfColumnHints;
  }

  public get lengthOfRowHints(): number {
    return this.nonogram.maxLengthOfRowHints;
  }

  public getCell(xCoord: number, yCoord: number): CellModel {
    return this.nonogram.getCell(xCoord, yCoord);
  }

  public getColumnHint(xCoord: number, yCoord: number): HintModel {
    return this.nonogram.getColumnHint(xCoord, yCoord);
  }

  public getRowHint(xCoord: number, yCoord: number): HintModel {
    return this.nonogram.getRowHint(xCoord, yCoord);
  }

  public changeCellValue(value: CellCoords): void {
    const newValue = this.nonogram.getCellState(value.xCoord, value.yCoord) === 'filled' ? 1 : 0;
    this.nonogram.setCellValue(value.xCoord, value.yCoord, newValue);
  }

  public compareSequences(cellCoords: CellCoords): boolean {
    if (areValidSequences(this.nonogram.PlayerCellsValues, this.nonogram.template, cellCoords)) {
      return areGridsEqual(this.nonogram.PlayerCellsValues, this.nonogram.template);
    }
    return false;
  }

  public update(value: CellCoords): void {
    this.changeCellValue(value);
    this.compareSequences(value);
  }
}
