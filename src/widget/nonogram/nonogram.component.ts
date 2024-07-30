import { BaseComponent, bcToFc, table, tbody, td, tr } from '@control.ts/min';
import { cell } from './cell';
import { hint } from './hint';
import { NonogramModel } from './nonogram.model';

export class NonogramComponent extends BaseComponent<HTMLTableElement> {
  private nonogram!: NonogramModel;
  private cellTable!: HTMLTableElement;
  private columnHintsTable!: HTMLTableElement;
  private rowHintsTable!: HTMLTableElement;

  constructor() {
    super({ tag: 'table', className: 'nonogram' });
  }

  public setTemplate(nonogram: NonogramModel): void {
    this.nonogram = nonogram;
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

  private generateTableElements(
    numRows: number,
    numCols: number,
    generateElement: (rowIndex: number, colIndex: number) => HTMLElement,
  ): HTMLElement[] {
    return Array.from({ length: numRows }, (_, rowIndex) =>
      tr(
        {},
        ...Array.from({ length: numCols }, (__, colIndex) => generateElement(rowIndex, colIndex)),
      ),
    );
  }

  private generateCells(): HTMLElement[] {
    return this.generateTableElements(
      this.nonogram.templateRows,
      this.nonogram.templateColumns,
      (rowIndex, colIndex) => cell(this.nonogram.getCell(colIndex, rowIndex)).node,
    );
  }

  private generateColumnHints(): HTMLElement[] {
    return this.generateTableElements(
      this.nonogram.longestColumnSequence,
      this.nonogram.templateColumns,
      (rowIndex, colIndex) => hint(this.nonogram.getColumnHint(rowIndex, colIndex)).node,
    );
  }

  private generateRowHints(): HTMLElement[] {
    return this.generateTableElements(
      this.nonogram.templateRows,
      this.nonogram.longestRowSequence,
      (rowIndex, colIndex) => hint(this.nonogram.getRowHint(colIndex, rowIndex)).node,
    );
  }
}

export const nonogram = bcToFc(NonogramComponent);
