import { readlines } from '@/utils/readlines';

enum theirStrategy {
  ROCK = 'A',
  PAPER = 'B',
  SCISSORS = 'C',
}

enum yourStrategy {
  ROCK = 'X',
  PAPER = 'Y',
  SCISSORS = 'Z',
}

const results = {
  [theirStrategy.ROCK]: {
    [yourStrategy.ROCK]: 3,
    [yourStrategy.PAPER]: 6,
    [yourStrategy.SCISSORS]: 0,
  },
  [theirStrategy.PAPER]: {
    [yourStrategy.ROCK]: 0,
    [yourStrategy.PAPER]: 3,
    [yourStrategy.SCISSORS]: 6,
  },
  [theirStrategy.SCISSORS]: {
    [yourStrategy.ROCK]: 6,
    [yourStrategy.PAPER]: 0,
    [yourStrategy.SCISSORS]: 3,
  },
};

const yourStrategyScore = {
  [yourStrategy.ROCK]: 1,
  [yourStrategy.PAPER]: 2,
  [yourStrategy.SCISSORS]: 3,
};
/**
 * Day 2 Part One notes
 * A for Rock, B for Paper, and C for Scissors
 * Y for Paper (2), Z for Scissors (3), X for Rock (1)
 * 0 for loss, 3 for draw, 6 for win
 */

export async function dayTwoPartOne(filePath: string): Promise<number> {
  let totalScore = 0;
  for await (const line of readlines(filePath)) {
    const [theyPick, youPick] = line.split(' ') as [
      theirStrategy,
      yourStrategy
    ];
    if (!theyPick || !youPick) throw new Error('Unexpected error');
    totalScore += results[theyPick][youPick] + yourStrategyScore[youPick];
  }
  return totalScore;
}

// 2 + 6
// 3 + 6
// 1 + 6
