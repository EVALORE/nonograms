import { CellModel } from './cell';
import { HintModel } from './hint';
import { type NonogramGrid } from './types/templateValues';
import { extractHintSequences } from './lib';

export class NonogramModel {
  public readonly templateRows: number;
  public readonly templateColumns: number;

  public PlayerCellsValues: NonogramGrid = [];
  public sequencesOfEachColumn: number[][];
  public sequencesOfEachRow: number[][];

  public cells: CellModel[][];
  public columnHints: HintModel[][];
  public rowHints: HintModel[][];

  public maxLengthOfColumnHints: number;
  public maxLengthOfRowHints: number;

  public readonly template: NonogramGrid;
  constructor(template: NonogramGrid) {
    this.template = template;
    this.templateRows = template.length;
    this.templateColumns = template[0]!.length;

    this.PlayerCellsValues = this.initializePlayerCellsValues();

    this.sequencesOfEachColumn = extractHintSequences('column', template);
    this.sequencesOfEachRow = extractHintSequences('row', template);

    this.columnHints = this.initializeHints(this.sequencesOfEachColumn);
    this.rowHints = this.initializeHints(this.sequencesOfEachRow);

    this.cells = this.initializeCells();

    this.maxLengthOfColumnHints = this.sequencesOfEachColumn[0]!.length;
    this.maxLengthOfRowHints = this.sequencesOfEachRow[0]!.length;
  }

  public setCellValue(xCoord: number, yCoord: number, value: 0 | 1): void {
    this.PlayerCellsValues[yCoord]![xCoord] = value;
  }

  public getCellState(xCoord: number, yCoord: number): CellModel['state'] {
    return this.cells[yCoord]![xCoord]!.state;
  }

  public getCell(xCoord: number, yCoord: number): CellModel {
    return this.cells[yCoord]![xCoord]!;
  }

  public getColumnHint(xCoord: number, yCoord: number): HintModel {
    return this.columnHints[yCoord]![xCoord]!;
  }

  public getRowHint(xCoord: number, yCoord: number): HintModel {
    return this.rowHints[yCoord]![xCoord]!;
  }

  // eslint-disable-next-line class-methods-use-this
  private initializeHints(sequences: number[][]): HintModel[][] {
    return sequences.map((sequence) => sequence.map((hintValue) => new HintModel(hintValue)));
  }

  private initializePlayerCellsValues(): NonogramGrid {
    return Array.from({ length: this.templateRows }, () =>
      Array.from({ length: this.templateColumns }, () => 0),
    );
  }

  private initializeCells(): CellModel[][] {
    return Array.from({ length: this.templateRows }, (_, rowIndex) =>
      Array.from(
        { length: this.templateColumns },
        (__, colIndex) => new CellModel(colIndex, rowIndex),
      ),
    );
  }
}
