import { BaseComponent, bcToFc, table, tbody, td, tr } from '@control.ts/min';
import { type NonogramService } from './nonogram.service';
import { cell } from './cell';
import { generateTableElements } from './lib';
import { hint } from './hint';

export class NonogramComponent extends BaseComponent<HTMLTableElement> {
  private cellTable!: HTMLTableElement;
  private columnHintsTable!: HTMLTableElement;
  private rowHintsTable!: HTMLTableElement;

  constructor(private readonly nonogramService: NonogramService) {
    super({ tag: 'table', className: 'nonogram' });
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
      this.nonogramService.templateRows,
      this.nonogramService.templateColumns,
      (rowIndex, colIndex) => cell(this.nonogramService.getCell(colIndex, rowIndex)).node,
    );
  }

  private generateColumnHints(): HTMLElement[] {
    return generateTableElements(
      this.nonogramService.lengthOfColumnHints,
      this.nonogramService.templateColumns,
      (rowIndex, colIndex) => hint(this.nonogramService.getColumnHint(rowIndex, colIndex)).node,
    );
  }

  private generateRowHints(): HTMLElement[] {
    return generateTableElements(
      this.nonogramService.templateRows,
      this.nonogramService.lengthOfRowHints,
      (rowIndex, colIndex) => hint(this.nonogramService.getRowHint(colIndex, rowIndex)).node,
    );
  }
}

export const nonogram = bcToFc(NonogramComponent);
