import { type CellCoords, type CellModel } from './cell';
import { type HintModel } from './hint';
import { type NonogramModel } from './nonogram.model';
import { type Observer } from '@shared/observer';
import { extractLineSequence } from './lib';

export class NonogramService implements Observer<CellCoords> {
  private readonly nonogram: NonogramModel;
  constructor(nonogram: NonogramModel) {
    this.nonogram = nonogram;
    this.nonogram.cells.forEach((cell) => {
      cell.attach(this);
    });
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

  public getCellRow(value: CellCoords): number[] {
    const { yCoord } = value;

    const firstCellInRow = yCoord * this.templateColumns;
    const lastCellInRow = yCoord * this.templateColumns + this.templateColumns - 1;

    const sequence: (0 | 1)[] = [];

    for (let index = firstCellInRow; index <= lastCellInRow; index += 1) {
      sequence.push(this.nonogram.cells[index]!.state === 'filled' ? 1 : 0);
    }

    return extractLineSequence(sequence);
  }

  public getCellColumnSequence(value: CellCoords): number[] {
    const { xCoord } = value;

    const sequence: (0 | 1)[] = [];

    for (let rowIndex = 0; rowIndex < this.templateRows; rowIndex += 1) {
      const cellIndex = rowIndex * this.templateColumns + xCoord;
      sequence.push(this.nonogram.cells[cellIndex]!.state === 'filled' ? 1 : 0);
    }

    return extractLineSequence(sequence);
  }

  public getRowHint(colIndex: number, rowIndex: number): HintModel {
    return this.nonogram.rowHints[rowIndex]!.hints[colIndex]!;
  }

  public getColumnHint(rowIndex: number, colIndex: number): HintModel {
    return this.nonogram.columnHints[colIndex]!.hints[rowIndex]!;
  }

  public getHintColumnSequence(coords: CellCoords): number[] {
    const { xCoord } = coords;
    return this.nonogram.columnHints[xCoord]!.sequence.filter((value) => value !== 0);
  }

  public getHintRowSequence(coords: CellCoords): number[] {
    const { yCoord } = coords;
    return this.nonogram.rowHints[yCoord]!.sequence.filter((value) => value !== 0);
  }

  public compareSequences(coords: CellCoords): void {
    const isRightColumnSequence =
      JSON.stringify(this.getCellColumnSequence(coords)) ===
      JSON.stringify(this.getHintColumnSequence(coords));

    const isRightRowSequence =
      JSON.stringify(this.getCellRow(coords)) === JSON.stringify(this.getHintRowSequence(coords));

    if (isRightColumnSequence) {
      this.nonogram.columnHints[coords.xCoord]!.state = 'solved';
    }

    if (isRightRowSequence) {
      this.nonogram.rowHints[coords.yCoord]!.state = 'solved';
    }

    if (isRightColumnSequence && isRightRowSequence) {
      this.nonogram.state = 'solved';
      this.nonogram.rowHints.forEach((hint) => {
        if (hint.state === 'unsolved') {
          this.nonogram.state = 'unsolved';
        }
      });

      this.nonogram.columnHints.forEach((hint) => {
        if (hint.state === 'unsolved') {
          this.nonogram.state = 'unsolved';
        }
      });
    }
  }

  public update(coords: CellCoords): void {
    this.compareSequences(coords);
  }
}
