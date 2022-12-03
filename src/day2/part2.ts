import { readlines } from '@/utils/readlines';

enum theirStrategy {
  ROCK = 'A',
  PAPER = 'B',
  SCISSORS = 'C',
}

enum yourStrategy {
  LOSE = 'X',
  DRAW = 'Y',
  WIN = 'Z',
}

enum yourChoice {
  ROCK,
  PAPER,
  SCISSORS,
}

const results: Record<yourStrategy, Record<theirStrategy, yourChoice>> = {
  [yourStrategy.LOSE]: {
    [theirStrategy.ROCK]: yourChoice.SCISSORS,
    [theirStrategy.PAPER]: yourChoice.ROCK,
    [theirStrategy.SCISSORS]: yourChoice.PAPER,
  },
  [yourStrategy.DRAW]: {
    [theirStrategy.ROCK]: yourChoice.ROCK,
    [theirStrategy.PAPER]: yourChoice.PAPER,
    [theirStrategy.SCISSORS]: yourChoice.SCISSORS,
  },
  [yourStrategy.WIN]: {
    [theirStrategy.ROCK]: yourChoice.PAPER,
    [theirStrategy.PAPER]: yourChoice.SCISSORS,
    [theirStrategy.SCISSORS]: yourChoice.ROCK,
  },
};

const yourStrategyScore = {
  [yourStrategy.LOSE]: 0,
  [yourStrategy.DRAW]: 3,
  [yourStrategy.WIN]: 6,
};

const yourChoiceScore = {
  [yourChoice.ROCK]: 1,
  [yourChoice.PAPER]: 2,
  [yourChoice.SCISSORS]: 3,
};
/**
 * Day 2 Part Two notes
 * A for Rock, B for Paper, and C for Scissors
 * X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
 * Paper (2), Scissors (3), Rock (1)
 * 0 for loss, 3 for draw, 6 for win
 */

// 3 1
// 6 3
// 0 2

export async function dayTwoPartTwo(filePath: string): Promise<number> {
  let totalScore = 0;
  for await (const line of readlines(filePath)) {
    const [theyPick, yourStrategyPick] = line.split(' ') as [
      theirStrategy,
      yourStrategy
    ];
    if (!theyPick || !yourStrategyPick) throw new Error('Unexpected error');

    const yourChoice = results[yourStrategyPick][theyPick];
    totalScore +=
      yourChoiceScore[yourChoice] + yourStrategyScore[yourStrategyPick];
  }
  return totalScore;
}
