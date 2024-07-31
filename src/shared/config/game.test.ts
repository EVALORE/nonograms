import { describe, expect, it } from 'vitest';
import { GameService } from './game.service';

describe('test', () => {
  const game = new GameService();

  it('test 2', () => {
    expect(game.getState()).toBe('unsolved');
  });

  it('test', () => {
    expect(true).toBe(true);
  });
});
