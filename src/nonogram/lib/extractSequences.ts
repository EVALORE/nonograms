import { areInvalidParams } from './validations';

export function getRowSequence(row: number, template: number[][]): number[] {
  if (areInvalidParams(row, template)) {
    return [];
  }
  const rowSequences: number[] = [];
  let counter = 0;

  template[row]!.forEach((currentCell) => {
    if (currentCell === 1) {
      counter += 1;
    } else if (counter > 0) {
      rowSequences.push(counter);
      counter = 0;
    }
  });

  if (counter > 0) {
    rowSequences.push(counter);
  }

  return rowSequences;
}

export function getColumnSequence(columnIndex: number, template: number[][]): number[] {
  if (areInvalidParams(columnIndex, template)) {
    return [];
  }

  const columnSequences: number[] = [];
  let counter = 0;

  template.forEach((row) => {
    const currentCell = row[columnIndex];
    if (currentCell === 1) {
      counter += 1;
    } else if (counter > 0) {
      columnSequences.push(counter);
      counter = 0;
    }
  });

  if (counter > 0) {
    columnSequences.push(counter);
  }

  return columnSequences;
}

export function extractHintSequences(
  sequencesDirection: 'row' | 'column',
  template: number[][],
): number[][] {
  const getSequenceFunction = sequencesDirection === 'row' ? getRowSequence : getColumnSequence;
  let maxSequenceLength = 0;

  const sequences = Array.from({
    length: sequencesDirection === 'row' ? template.length : template[0]!.length,
  }).map((_, sequenceIndex) => {
    const sequence = getSequenceFunction(sequenceIndex, template);
    maxSequenceLength = Math.max(maxSequenceLength, sequence.length);
    return sequence;
  });

  sequences.forEach((sequence) => {
    while (sequence.length < maxSequenceLength) {
      sequence.unshift(0);
    }
  });

  return sequences;
}
