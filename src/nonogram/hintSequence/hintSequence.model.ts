import { HintModel } from '../hint/hint.model';

export class HintSequenceModel {
  public state: 'solved' | 'unsolved';
  public readonly hints: HintModel[];
  constructor(public readonly sequence: number[]) {
    this.hints = this.sequence.map((value) => new HintModel(value));
    this.sequence = this.sequence.filter((value) => value !== 0);
    this.state = this.sequence.length === 0 ? 'solved' : 'unsolved';
  }

  public getHint(hintIndex: number): HintModel {
    return this.hints[hintIndex]!;
  }
}
