import { CellModel } from './cell';
import { HintSequenceModel } from './hintSequence';
import { type NonogramGrid } from './types/templateValues';
import { extractHintSequences } from './lib';

const template: NonogramGrid = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
];

export class NonogramModel {
  public readonly templateRows: number;
  public readonly templateColumns: number;

  public readonly cells: CellModel[];
  public readonly columnHints: HintSequenceModel[];
  public readonly rowHints: HintSequenceModel[];

  public readonly template: NonogramGrid;

  public longestColumnSequence = 0;
  public longestRowSequence = 0;

  constructor() {
    this.template = template;
    this.templateRows = template.length;
    this.templateColumns = template[0]!.length;

    this.columnHints = this.initializeColumnHints();

    this.rowHints = this.initializeRowHints();

    this.cells = this.initializeCells();
  }

  private initializeColumnHints(): HintSequenceModel[] {
    const sequencesOfEachColumn = extractHintSequences('column', this.template);
    this.longestColumnSequence = sequencesOfEachColumn[0]!.length;

    return sequencesOfEachColumn.map((sequence) => new HintSequenceModel(sequence));
  }

  private initializeRowHints(): HintSequenceModel[] {
    const sequencesOfEachRow = extractHintSequences('row', this.template);
    this.longestRowSequence = sequencesOfEachRow[0]!.length;

    return sequencesOfEachRow.map((sequence) => new HintSequenceModel(sequence));
  }

  private initializeCells(): CellModel[] {
    const cells = new Array<CellModel>(this.templateColumns * this.templateRows);

    for (let rowIndex = 0; rowIndex < this.templateRows; rowIndex += 1) {
      for (let colIndex = 0; colIndex < this.templateColumns; colIndex += 1) {
        cells[rowIndex * this.templateColumns + colIndex] = new CellModel(colIndex, rowIndex);
      }
    }

    return cells;
  }
}
