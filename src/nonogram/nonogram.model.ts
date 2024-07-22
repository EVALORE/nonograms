import { CellModel } from './cell';
import { HintModel } from './hint';
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
  public readonly columnHints: HintModel[];
  public readonly rowHints: HintModel[];

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

  private initializeColumnHints(): HintModel[] {
    const sequencesOfEachColumn = extractHintSequences('column', template);
    this.longestColumnSequence = sequencesOfEachColumn[0]!.length;

    const hints = new Array<HintModel>(this.templateColumns * this.longestColumnSequence);

    for (let rowIndex = 0; rowIndex < this.templateColumns; rowIndex += 1) {
      for (let colIndex = 0; colIndex < this.longestColumnSequence; colIndex += 1) {
        hints[rowIndex * this.longestColumnSequence + colIndex] = new HintModel(
          sequencesOfEachColumn[rowIndex]![colIndex]!,
        );
      }
    }

    return hints;
  }

  private initializeRowHints(): HintModel[] {
    const sequencesOfEachRow = extractHintSequences('row', template);
    this.longestRowSequence = sequencesOfEachRow[0]!.length;

    const hints = new Array<HintModel>(this.templateRows * this.longestRowSequence);

    for (let rowIndex = 0; rowIndex < this.templateRows; rowIndex += 1) {
      for (let hintIndex = 0; hintIndex < this.longestRowSequence; hintIndex += 1) {
        hints[rowIndex * this.longestRowSequence + hintIndex] = new HintModel(
          sequencesOfEachRow[rowIndex]![hintIndex]!,
        );
      }
    }

    return hints;
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
