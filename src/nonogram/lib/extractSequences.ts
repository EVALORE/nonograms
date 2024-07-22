import { type NonogramGrid } from '../types/templateValues';

function extractLineSequence(line: (0 | 1)[]): number[] {
  const sequences: number[] = [];
  let counter = 0;

  line.forEach((currentCell) => {
    if (currentCell === 1) {
      counter += 1;
    } else if (counter > 0) {
      sequences.push(counter);
      counter = 0;
    }
  });

  if (counter > 0) {
    sequences.push(counter);
  }

  return sequences;
}

// Refactored functions
export function getRowSequence(row: number, template: NonogramGrid): number[] {
  return extractLineSequence(template[row]!);
}

export function getColumnSequence(columnIndex: number, template: NonogramGrid): number[] {
  const column = template.map((row) => row[columnIndex]!);
  return extractLineSequence(column);
}

export function extractHintSequences(
  sequencesDirection: 'row' | 'column',
  template: NonogramGrid,
): number[][] {
  const sequences =
    sequencesDirection === 'row'
      ? template.map(extractLineSequence)
      : Array.from({ length: template[0]!.length }, (_, colIndex) =>
          extractLineSequence(template.map((row) => row[colIndex]!)),
        );

  const maxSequenceLength = Math.max(...sequences.map((seq) => seq.length));
  return sequences.map((sequence) =>
    Array<number>(maxSequenceLength - sequence.length)
      .fill(0)
      .concat(sequence),
  );
}
