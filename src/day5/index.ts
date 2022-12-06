import { messages } from '@/utils/messages';
import { readlines } from '@/utils/readlines';

export async function dayFivePartOne(filePath: string): Promise<string> {
  const crateLines: string[] = [];
  const crateStacks: string[][] = [];
  let skipLine = false;
  for await (const line of readlines(filePath)) {
    if (crateStacks.length) {
      if (!skipLine) {
        skipLine = true;
        continue;
      }
      const instructionMatches = line.match(/\d+/g);
      if (!instructionMatches || instructionMatches.length !== 3) {
        throw new Error(messages.UnexpectedError);
      }
      const [numToMoveString, fromString, toString] =
        instructionMatches as string[];
      if (!numToMoveString || !fromString || !toString)
        throw new Error(messages.UnexpectedError);
      const numToMove = +numToMoveString;
      const fromCrate = crateStacks[+fromString - 1]; // to zero index
      const toCrate = crateStacks[+toString - 1]; // to zero index
      if (!fromCrate || !toCrate) throw new Error(messages.UnexpectedError);
      for (let i = 0; i < numToMove; i++) {
        const movingCrate = fromCrate.pop();
        if (!movingCrate) throw new Error(messages.UnexpectedError);
        toCrate.push(movingCrate);
      }
    } else {
      if (line.includes('[')) {
        crateLines.push(line);
      } else {
        // get all numbers in the line of numbers and add crates as the numbers increment
        const matches = line.matchAll(/\d+/g);
        while (!matches.next().done) {
          crateStacks.push([]);
        }
        makeCrateStacks(crateStacks, crateLines);
      }
    }
  }
  return crateStacks.map((stack) => stack.pop()).join('');
}

function makeCrateStacks(crateStacks: string[][], crateLines: string[]) {
  const reversedCrateLines = crateLines.reverse();
  for (const line of reversedCrateLines) {
    // get all spaces and crates
    const matches = line.match(/\s{4}|[a-zA-Z]+/g);
    if (!matches || !matches.length) throw new Error(messages.UnexpectedError);
    let stackIndex = 0;
    for (const crate of matches) {
      if (crate.trim()) crateStacks[stackIndex]?.push(crate);
      stackIndex++;
    }
  }
}

// ab,cde,f,gh
// ,cde,baf,gh
// dc,e,baf,gh
// c,de,baf,gh

export async function dayFivePartTwo(filePath: string): Promise<string> {
  const crateLines: string[] = [];
  const crateStacks: string[][] = [];
  let skipLine = false;
  for await (const line of readlines(filePath)) {
    if (crateStacks.length) {
      if (!skipLine) {
        skipLine = true;
        continue;
      }
      const instructionMatches = line.match(/\d+/g);
      if (!instructionMatches || instructionMatches.length !== 3) {
        throw new Error(messages.UnexpectedError);
      }
      const [numToMoveString, fromString, toString] =
        instructionMatches as string[];
      if (!numToMoveString || !fromString || !toString)
        throw new Error(messages.UnexpectedError);
      const numToMove = +numToMoveString;
      const fromCrate = crateStacks[+fromString - 1]; // to zero index
      const toCrate = crateStacks[+toString - 1]; // to zero index
      if (!fromCrate || !toCrate) throw new Error(messages.UnexpectedError);
      toCrate.push(...fromCrate.splice(-numToMove, numToMove));
    } else {
      if (line.includes('[')) {
        crateLines.push(line);
      } else {
        // get all numbers in the line of numbers and add crates as the numbers increment
        const matches = line.matchAll(/\d+/g);
        while (!matches.next().done) {
          crateStacks.push([]);
        }
        makeCrateStacks(crateStacks, crateLines);
      }
    }
  }
  return crateStacks.map((stack) => stack.pop()).join('');
}

// ab,cde,f,gh
// ,cde,abf,gh
// cd,e,abf,gh
// d,ce,abf,gh
