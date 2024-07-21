import { tr } from '@control.ts/min';

export function generateTableElements(
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
