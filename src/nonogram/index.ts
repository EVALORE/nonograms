import './style.scss';
import { table, tbody, td, tr } from '@control.ts/min';
import { NonogramService } from './nonogram.service';
import { cell } from './cell';
import { generateTableContent } from './lib';
import { hint } from './hint';

const template: (1 | 0)[][] = [
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

const gameSession = new NonogramService(template);

const cellBoard = tbody(
  {},
  ...generateTableContent(
    gameSession.templateRows,
    gameSession.templateColumns,
    (rowIndex, colIndex) => cell(gameSession.cells[rowIndex]![colIndex]!).node,
  ),
);

const columnHintsBoard = tbody(
  {},
  ...generateTableContent(
    gameSession.maxLengthOfColumnHints,
    gameSession.templateColumns,
    (rowIndex, colIndex) => hint(gameSession.columnHints[colIndex]![rowIndex]!).node,
  ),
);

const rowHintsBoard = tbody(
  {},
  ...generateTableContent(
    gameSession.templateRows,
    gameSession.maxLengthOfRowHints,
    (rowIndex, colIndex) => hint(gameSession.rowHints[rowIndex]![colIndex]!).node,
  ),
);

export const nonogram = table(
  {
    className: 'nonogram',
  },
  tbody(
    {},
    tr({}, td({ className: 'empty-body' }), td({}, table({}, columnHintsBoard))),
    tr({}, td({}, table({}, rowHintsBoard)), td({}, table({}, cellBoard))),
  ),
);
