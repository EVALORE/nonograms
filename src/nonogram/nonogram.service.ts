import { type CellCoords, type CellModel } from './cell';
import { type HintModel } from './hint';

import { type NonogramModel } from './nonogram.model';
import { type Observer } from '@shared/observer';

export class NonogramService implements Observer<CellCoords> {
  private readonly nonogram: NonogramModel;
  constructor(nonogram: NonogramModel) {
    this.nonogram = nonogram;
  }

  public get templateRows(): number {
    return this.nonogram.templateRows;
  }

  public get templateColumns(): number {
    return this.nonogram.templateColumns;
  }

  public get lengthOfColumnHints(): number {
    return this.nonogram.longestColumnSequence;
  }

  public get lengthOfRowHints(): number {
    return this.nonogram.longestRowSequence;
  }

  public getCell(colIndex: number, rowIndex: number): CellModel {
    return this.nonogram.cells[rowIndex * this.templateColumns + colIndex]!;
  }

  public getRowHint(colIndex: number, rowIndex: number): HintModel {
    return this.nonogram.rowHints[rowIndex * this.lengthOfRowHints + colIndex]!;
  }

  public getColumnHint(rowIndex: number, colIndex: number): HintModel {
    return this.nonogram.columnHints[colIndex * this.lengthOfColumnHints + rowIndex]!;
  }

  public update(value: CellCoords): void {
    const { xCoord, yCoord } = value;
    this.getCell(xCoord, yCoord);
  }
}
