import { templateAPI } from '@features';
import { CellModel } from './cell';
import { type HintModel } from './hint';
import { HintSequenceModel } from './hintSequence';

export class NonogramModel {
  public readonly templateRows: number;
  public readonly templateColumns: number;

  public readonly cells: CellModel[];
  public readonly columnHintSequences: HintSequenceModel[];
  public readonly rowHintSequences: HintSequenceModel[];

  public longestColumnSequence = 0;
  public longestRowSequence = 0;

  public state: 'unsolved' | 'solved' = 'unsolved';
  public puzzle: number[][];

  constructor({ columns, rows, puzzle }: templateAPI) {
    this.templateRows = rows;
    this.templateColumns = columns;
    this.puzzle = puzzle;
    this.columnHintSequences = this.initializeHints('column');
    this.rowHintSequences = this.initializeHints('row');
    this.cells = this.initializeCells();
  }

  public getCell(colIndex: number, rowIndex: number): CellModel {
    return this.cells[rowIndex * this.templateColumns + colIndex]!;
  }

  public getRowCellSequence(rowIndex: number): number[] {
    const firstCellInRow = rowIndex * this.templateColumns;
    const lastCellInRow = rowIndex * this.templateColumns + this.templateColumns - 1;

    const sequence: (0 | 1)[] = [];

    for (let cellIndex = firstCellInRow; cellIndex <= lastCellInRow; cellIndex += 1) {
      sequence.push(this.cells[cellIndex]!.state === 'filled' ? 1 : 0);
    }

    return this.extractSequence(sequence);
  }

  public getColumnCellSequence(colIndex: number): number[] {
    const sequence: (0 | 1)[] = [];

    for (let rowIndex = 0; rowIndex < this.templateRows; rowIndex += 1) {
      const cellIndex = rowIndex * this.templateColumns + colIndex;
      sequence.push(this.cells[cellIndex]!.state === 'filled' ? 1 : 0);
    }

    return this.extractSequence(sequence);
  }

  public getRowHint(colIndex: number, rowIndex: number): HintModel {
    return this.rowHintSequences[rowIndex]!.getHint(colIndex);
  }

  public getColumnHint(rowIndex: number, colIndex: number): HintModel {
    return this.columnHintSequences[colIndex]!.getHint(rowIndex);
  }

  public getColumnHintSequence(colIndex: number): number[] {
    return this.columnHintSequences[colIndex]!.sequence;
  }

  public getRowHintSequence(rowIndex: number): number[] {
    return this.rowHintSequences[rowIndex]!.sequence;
  }

  private isNonogramSolved(): boolean {
    return (
      this.columnHintSequences.every((sequence) => sequence.state === 'solved') &&
      this.rowHintSequences.every((sequence) => sequence.state === 'solved')
    );
  }

  private changeNonogramState(): void {
    this.state = this.isNonogramSolved() ? 'solved' : 'unsolved';
  }

  private checkSequences(colIndex: number, rowIndex: number): void {
    const isRightColumnSequence =
      JSON.stringify(this.getColumnCellSequence(colIndex)) ===
      JSON.stringify(this.getColumnHintSequence(colIndex));

    const isRightRowSequence =
      JSON.stringify(this.getRowCellSequence(rowIndex)) ===
      JSON.stringify(this.getRowHintSequence(rowIndex));

    if (isRightColumnSequence) {
      this.columnHintSequences[colIndex]!.state = 'solved';
    }

    if (isRightRowSequence) {
      this.rowHintSequences[rowIndex]!.state = 'solved';
    }

    if (isRightColumnSequence && isRightRowSequence) {
      this.changeNonogramState();
    }
  }

  private initializeCells(): CellModel[] {
    const cells = new Array<CellModel>(this.templateColumns * this.templateRows);

    for (let rowIndex = 0; rowIndex < this.templateRows; rowIndex += 1) {
      for (let colIndex = 0; colIndex < this.templateColumns; colIndex += 1) {
        cells[rowIndex * this.templateColumns + colIndex] = new CellModel(() => {
          this.checkSequences(colIndex, rowIndex);
        });
      }
    }

    return cells;
  }

  private initializeHints(direction: 'row' | 'column'): HintSequenceModel[] {
    const sequences = this.extractHintSequences(direction);
    this.updateLongestSequence(sequences, direction);
    return sequences.map((sequence) => new HintSequenceModel(sequence));
  }

  private extractSequence = (line: number[]): number[] =>
    line
      .join('')
      .split('0')
      .filter(Boolean)
      .map((seq) => seq.length);

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
    return this.puzzle.map(this.extractSequence);
  }

  private extractColumnHintSequences(): number[][] {
    return this.transposeTemplate().map(this.extractSequence);
  }

  private transposeTemplate(): number[][] {
    return Array.from({ length: this.templateColumns }, (_, colIndex) =>
      this.puzzle.map((row) => row[colIndex]!),
    );
  }

  private padSequence(sequence: number[], targetLength: number): number[] {
    return Array<number>(targetLength - sequence.length)
      .fill(0)
      .concat(sequence);
  }
}
