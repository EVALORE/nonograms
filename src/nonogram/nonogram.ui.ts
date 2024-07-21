import { BaseComponent, bcToFc, table, tbody, td, tr } from '@control.ts/min';
import { type NonogramGrid } from './types/templateValues';
import { NonogramModel } from './nonogram.model';
import { cell } from './cell';
import { generateTableElements } from './lib';
import { hint } from './hint';

const template: NonogramGrid = [
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
];

export class NonogramUI extends BaseComponent<HTMLTableElement> {
  private nonogram: NonogramModel;

  private cellTable!: HTMLTableElement;
  private columnHintsTable!: HTMLTableElement;
  private rowHintsTable!: HTMLTableElement;

  constructor() {
    super({ tag: 'table', className: 'nonogram' });
    this.nonogram = new NonogramModel(template);
    this.initializeTables();
    this.renderTables();
  }

  private initializeTables(): void {
    this.cellTable = table({});
    this.columnHintsTable = table({});
    this.rowHintsTable = table({});
  }

  private renderTables(): void {
    this.renderCellTable();
    this.renderColumnHintsTable();
    this.renderRowHintsTable();
    this.appendTablesToDOM();
  }

  private renderCellTable(): void {
    const tbodyElement = tbody({}, ...this.generateCells());
    this.cellTable.append(tbodyElement);
  }

  private renderColumnHintsTable(): void {
    const tbodyElement = tbody({}, ...this.generateColumnHints());
    this.columnHintsTable.append(tbodyElement);
  }

  private renderRowHintsTable(): void {
    const tbodyElement = tbody({}, ...this.generateRowHints());
    this.rowHintsTable.append(tbodyElement);
  }

  private appendTablesToDOM(): void {
    this.append(
      tbody(
        {},
        tr({}, td({ className: 'empty-body' }), td({}, this.columnHintsTable)),
        tr({}, td({}, this.rowHintsTable), td({}, this.cellTable)),
      ),
    );
  }

  private generateCells(): HTMLElement[] {
    return generateTableElements(
      this.nonogram.templateRows,
      this.nonogram.templateColumns,
      (rowIndex, colIndex) => cell(this.nonogram.getCell(colIndex, rowIndex)).node,
    );
  }

  private generateColumnHints(): HTMLElement[] {
    return generateTableElements(
      this.nonogram.maxLengthOfColumnHints,
      this.nonogram.templateColumns,
      (rowIndex, colIndex) => hint(this.nonogram.getColumnHint(rowIndex, colIndex)).node,
    );
  }

  private generateRowHints(): HTMLElement[] {
    return generateTableElements(
      this.nonogram.templateRows,
      this.nonogram.maxLengthOfRowHints,
      (rowIndex, colIndex) => hint(this.nonogram.getRowHint(colIndex, rowIndex)).node,
    );
  }
}

export const nonogram = bcToFc(NonogramUI);
