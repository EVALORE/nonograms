import { CellModel } from './cell';
import { type HintModel } from './hint';
import { HintSequenceModel } from './hintSequence';
import { type NonogramGrid } from './types/templateValues';

export class NonogramModel {
  public readonly templateRows: number;
  public readonly templateColumns: number;

  public readonly cells: CellModel[];
  public readonly columnHints: HintSequenceModel[];
  public readonly rowHints: HintSequenceModel[];

  public readonly template: NonogramGrid;

  public longestColumnSequence = 0;
  public longestRowSequence = 0;

  public state: 'unsolved' | 'solved' = 'unsolved';

  constructor(template: NonogramGrid) {
    this.template = template;
    this.templateRows = template.length;
    this.templateColumns = template[0]!.length;
    this.columnHints = this.initializeHints('column');
    this.rowHints = this.initializeHints('row');
    this.cells = this.initializeCells();
  }

  public getCell(colIndex: number, rowIndex: number): CellModel {
    return this.cells[rowIndex * this.templateColumns + colIndex]!;
  }

  public getCellRowSequence(rowIndex: number): number[] {
    const firstCellInRow = rowIndex * this.templateColumns;
    const lastCellInRow = rowIndex * this.templateColumns + this.templateColumns - 1;

    const sequence: (0 | 1)[] = [];

    for (let cellIndex = firstCellInRow; cellIndex <= lastCellInRow; cellIndex += 1) {
      sequence.push(this.cells[cellIndex]!.state === 'filled' ? 1 : 0);
    }

    return this.extractSequence(sequence);
  }

  public getCellColumnSequence(colIndex: number): number[] {
    const sequence: (0 | 1)[] = [];

    for (let rowIndex = 0; rowIndex < this.templateRows; rowIndex += 1) {
      const cellIndex = rowIndex * this.templateColumns + colIndex;
      sequence.push(this.cells[cellIndex]!.state === 'filled' ? 1 : 0);
    }

    return this.extractSequence(sequence);
  }

  public getRowHint(colIndex: number, rowIndex: number): HintModel {
    return this.rowHints[rowIndex]!.getHint(colIndex);
  }

  public getColumnHint(rowIndex: number, colIndex: number): HintModel {
    return this.columnHints[colIndex]!.getHint(rowIndex);
  }

  public getColumnHintSequence(colIndex: number): number[] {
    return this.columnHints[colIndex]!.sequence;
  }

  public getRowHintSequence(rowIndex: number): number[] {
    return this.rowHints[rowIndex]!.sequence;
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

  private extractSequence = (line: number[]): number[] =>
    line
      .join('')
      .split('0')
      .filter(Boolean)
      .map((seq) => seq.length);

  private initializeHints(direction: 'row' | 'column'): HintSequenceModel[] {
    const sequences = this.extractHintSequences(direction);
    this.updateLongestSequence(sequences, direction);
    return sequences.map((sequence) => new HintSequenceModel(sequence));
  }

  private updateLongestSequence(sequences: number[][], direction: 'row' | 'column') {
    const longestSequenceLength = sequences[0]!.length;
    if (direction === 'row') {
      this.longestRowSequence = longestSequenceLength;
    } else {
      this.longestColumnSequence = longestSequenceLength;
    }
  }

  private extractHintSequences(direction: 'row' | 'column'): number[][] {
    const sequences =
      direction === 'row' ? this.extractRowHintSequences() : this.extractColumnHintSequences();

    const longestSequenceLength = Math.max(...sequences.map((seq) => seq.length));
    return sequences.map((sequence) => this.padSequence(sequence, longestSequenceLength));
  }

  private extractRowHintSequences(): number[][] {
    return this.template.map(this.extractSequence);
  }

  private extractColumnHintSequences(): number[][] {
    return this.transposeTemplate().map(this.extractSequence);
  }

  private transposeTemplate(): number[][] {
    return Array.from({ length: this.template[0]!.length }, (_, colIndex) =>
      this.template.map((row) => row[colIndex]!),
    );
  }

  private padSequence(sequence: number[], targetLength: number): number[] {
    return Array<number>(targetLength - sequence.length)
      .fill(0)
      .concat(sequence);
  }
}
