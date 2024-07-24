import { HintModel } from '../hint/hint.model';

export class HintSequenceModel {
  public state: 'solved' | 'unsolved';
  public readonly hints: HintModel[];
  constructor(public readonly sequence: number[]) {
    this.state = sequence.length === 0 ? 'solved' : 'unsolved';
    this.hints = sequence.map((value) => new HintModel(value));
  }

  public getHint(hintIndex: number): HintModel {
    return this.hints[hintIndex]!;
  }
}
