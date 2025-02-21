export type HintStates = 'crossed' | 'unsolved' | 'solved';

export class HintModel {
  public state: HintStates = 'unsolved';
  public readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  public toggleState = (): void => {
    if (this.state === 'solved') {
      return;
    }
    this.state = this.state === 'unsolved' ? 'crossed' : 'unsolved';
  };
}
