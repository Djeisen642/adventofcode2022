import { messages } from '@/utils/messages';
import { readlines } from '@/utils/readlines';

export async function dayFourPartOne(filePath: string): Promise<number> {
  let overlapCount = 0;
  const regex = /(\d+)-(\d+),(\d+)-(\d+)/;
  for await (const line of readlines(filePath)) {
    const matches = line.match(regex);
    if (matches && matches.length < 5)
      throw new Error(messages.UnexpectedError);
    const [, firstGroupA, lastGroupA, firstGroupB, lastGroupB] = matches as [
      unknown,
      string,
      string,
      string,
      string
    ];
    if (+firstGroupA === +firstGroupB) {
      overlapCount++;
    } else if (+firstGroupA < +firstGroupB) {
      if (+lastGroupA >= +lastGroupB) {
        overlapCount++;
      }
    } else if (+lastGroupA <= +lastGroupB) {
      overlapCount++;
    }
  }
  return overlapCount;
}

export async function dayFourPartTwo(filePath: string): Promise<number> {
  let overlapCount = 0;
  const regex = /(\d+)-(\d+),(\d+)-(\d+)/;
  for await (const line of readlines(filePath)) {
    const matches = line.match(regex);
    if (matches && matches.length < 5)
      throw new Error(messages.UnexpectedError);
    const [, firstGroupA, lastGroupA, firstGroupB, lastGroupB] = matches as [
      unknown,
      string,
      string,
      string,
      string
    ];
    if (+firstGroupA === +firstGroupB) {
      // overlap on the first
      overlapCount++;
    } else if (+firstGroupA < +firstGroupB) {
      // overlap if group B starts before group A ends
      if (+firstGroupB <= +lastGroupA) {
        overlapCount++;
      }
    } else if (+firstGroupA <= +lastGroupB) {
      // overlap if group A starts before group B ends
      overlapCount++;
    }
  }
  return overlapCount;
}
