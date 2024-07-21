import { getColumnSequence, getRowSequence } from '../extractSequences';
import { type CellCoords } from '@src/nonogram/cell';
import { type NonogramGrid } from '@src/nonogram/types/templateValues';

export function areInvalidSequenceValues(
  playerSequence: number[],
  templateSequence: number[],
): boolean {
  for (let index = 0; index < playerSequence.length; index += 1) {
    if (playerSequence[index] !== templateSequence[index]) {
      return true;
    }
  }
  return false;
}

export function isInvalidLengthOfSequence(
  playerSequence: number[],
  templateSequence: number[],
): boolean {
  if (playerSequence.length !== templateSequence.length) {
    return true;
  }
  return false;
}

export function areValidSequences(
  PlayerGrid: NonogramGrid,
  TemplateGrid: NonogramGrid,
  cellCoords: CellCoords,
): boolean {
  const PlayerColumnSequence = getColumnSequence(cellCoords.xCoord, PlayerGrid);
  const PlayerRowSequence = getRowSequence(cellCoords.yCoord, PlayerGrid);

  const TemplateColumnSequence = getColumnSequence(cellCoords.xCoord, TemplateGrid);
  const TemplateRowSequence = getRowSequence(cellCoords.yCoord, TemplateGrid);

  if (isInvalidLengthOfSequence(PlayerColumnSequence, TemplateColumnSequence)) {
    return false;
  }

  if (isInvalidLengthOfSequence(PlayerRowSequence, TemplateRowSequence)) {
    return false;
  }

  if (areInvalidSequenceValues(PlayerRowSequence, TemplateRowSequence)) {
    return false;
  }

  if (areInvalidSequenceValues(PlayerColumnSequence, TemplateColumnSequence)) {
    return false;
  }

  return true;
}
