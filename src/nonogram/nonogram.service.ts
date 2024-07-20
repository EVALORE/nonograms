import { type CellCoords, CellModel } from './cell';
import { extractHintSequences, getColumnSequence, getRowSequence } from './lib';
import { HintModel } from './hint';
import { type Observer } from '@shared/observer';

export class NonogramService implements Observer<CellCoords> {
  public readonly templateRows: number;
  public readonly templateColumns: number;

  public cellsValues: (1 | 0)[][] = [];
  public sequencesOfEachColumn: number[][];
  public sequencesOfEachRow: number[][];

  public cells: CellModel[][];
  public columnHints: HintModel[][];
  public rowHints: HintModel[][];

  public maxLengthOfColumnHints: number;
  public maxLengthOfRowHints: number;

  constructor(private readonly template: (1 | 0)[][]) {
    this.templateRows = template.length;
    this.templateColumns = template[0]!.length;

    this.cellsValues = Array.from({ length: this.templateRows }, () =>
      Array.from({ length: this.templateColumns }, () => 0),
    );
    this.sequencesOfEachColumn = extractHintSequences('column', template);
    this.sequencesOfEachRow = extractHintSequences('row', template);

    this.columnHints = this.sequencesOfEachColumn.map((sequence) =>
      sequence.map((hintValue) => new HintModel(hintValue)),
    );
    this.rowHints = this.sequencesOfEachRow.map((sequence) =>
      sequence.map((hintValue) => new HintModel(hintValue)),
    );
    this.cells = Array.from({ length: this.templateRows }, (_, rowIndex) =>
      Array.from(
        { length: this.templateColumns },
        (__, colIndex) => new CellModel(colIndex, rowIndex),
      ),
    );

    this.maxLengthOfColumnHints = this.sequencesOfEachColumn[0]!.length;
    this.maxLengthOfRowHints = this.sequencesOfEachRow[0]!.length;

    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.attach(this);
      });
    });
  }

  public changeCellValue(value: CellCoords): void {
    this.cellsValues[value.yCoord]![value.xCoord] =
      this.cells[value.yCoord]![value.xCoord]?.state === 'filled' ? 1 : 0;
  }

  // eslint-disable-next-line complexity
  public compareSequences(cellCoords: CellCoords): boolean {
    const PlayerColumnSequence = getColumnSequence(cellCoords.xCoord, this.cellsValues);
    const PlayerRowSequence = getRowSequence(cellCoords.yCoord, this.cellsValues);

    const TemplateColumnSequence = getColumnSequence(cellCoords.xCoord, this.template);
    const TemplateRowSequence = getRowSequence(cellCoords.yCoord, this.template);

    if (PlayerColumnSequence.length > TemplateColumnSequence.length) {
      return false;
    }

    if (PlayerRowSequence.length > TemplateRowSequence.length) {
      return false;
    }

    for (let index = 0; index < PlayerColumnSequence.length; index += 1) {
      if (PlayerColumnSequence[index] !== TemplateColumnSequence[index]) {
        return false;
      }
    }

    for (let index = 0; index < PlayerRowSequence.length; index += 1) {
      if (PlayerRowSequence[index] !== TemplateRowSequence[index]) {
        return false;
      }
    }

    return true;
  }

  public update(value: CellCoords): void {
    this.changeCellValue(value);
  }
}
