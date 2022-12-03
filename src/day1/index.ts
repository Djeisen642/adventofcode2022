import { readlines } from '@/utils/readlines';

export async function dayOnePartOne(filePath: string): Promise<number> {
  let largestElfCalories = 0;
  let currentElfCalories = 0;
  for await (const line of readlines(filePath)) {
    if (line.trim() === '') {
      largestElfCalories = Math.max(currentElfCalories, largestElfCalories);
      currentElfCalories = 0;
    } else {
      const numCalories = +line;
      currentElfCalories += numCalories;
    }
  }
  largestElfCalories = Math.max(currentElfCalories, largestElfCalories);
  return largestElfCalories;
}

export async function dayOnePartTwo(filePath: string): Promise<number> {
  let topElfCalories: number[] = [];
  const maxEntries = 3;
  let currentElfCalories = 0;
  for await (const line of readlines(filePath)) {
    if (line.trim() === '') {
      topElfCalories = recheckCalories(
        topElfCalories,
        maxEntries,
        currentElfCalories
      );

      currentElfCalories = 0;
    } else {
      const numCalories = +line;
      currentElfCalories += numCalories;
    }
  }
  topElfCalories = recheckCalories(
    topElfCalories,
    maxEntries,
    currentElfCalories
  );
  return topElfCalories.reduce(
    (sum, newElfCalories) => sum + newElfCalories,
    0
  );
}

function recheckCalories(
  topElfCalories: number[],
  maxEntries: number,
  newEntry: number
): number[] {
  if (topElfCalories.length === maxEntries) {
    const index = topElfCalories.findIndex(
      (largeCalories) => largeCalories < newEntry
    );
    if (index >= 0) {
      topElfCalories[index] = newEntry;
    }
  } else {
    topElfCalories.push(newEntry);
  }
  topElfCalories.sort((a, b) => a - b);
  return topElfCalories;
}
