import { messages } from '@/utils/messages';
import { readlines } from '@/utils/readlines';

export async function dayThreePartOne(filePath: string): Promise<number> {
  let prioritiesSum = 0;
  for await (const line of readlines(filePath)) {
    const halfLineLength = line.length / 2;
    const firstHalf = line.slice(0, halfLineLength);
    const secondHalf = line.slice(halfLineLength);
    const firstHalfCharacters = firstHalf.split('').reduce((set, character) => {
      set.add(character);
      return set;
    }, new Set<string>());
    const character = secondHalf
      .split('')
      .find((char) => firstHalfCharacters.has(char));
    if (!character) throw new Error(messages.UnexpectedError);
    prioritiesSum += characterToPriority(character);
  }
  return prioritiesSum;
}

export async function dayThreePartTwo(filePath: string): Promise<number> {
  let badgeSum = 0;
  let lineNumber = 0;
  let firstLineSet: Set<string>;
  let remainingAfterSecondLine: Set<string>;
  for await (const line of readlines(filePath)) {
    const arrayOfCharacters = line.split('');
    if (lineNumber % 3 === 0) {
      firstLineSet = new Set(arrayOfCharacters);
    } else if (lineNumber % 3 === 1) {
      remainingAfterSecondLine = new Set(
        arrayOfCharacters.filter((char) => firstLineSet.has(char))
      );
    } else if (lineNumber % 3 === 2) {
      const character = arrayOfCharacters.find((char) =>
        remainingAfterSecondLine.has(char)
      );
      if (!character) throw new Error(messages.UnexpectedError);
      badgeSum += characterToPriority(character);
    }
    lineNumber++;
  }
  return badgeSum;
}

const lowerCaseACharCode = 'a'.charCodeAt(0);
const upperCaseACharCode = 'A'.charCodeAt(0);
export function characterToPriority(character: string): number {
  const isLowerCase = character.toLowerCase() === character;
  const charCode = character.charCodeAt(0) + 1; // if it's an a, then it should return 1
  if (isLowerCase) return charCode - lowerCaseACharCode;
  return 26 + charCode - upperCaseACharCode;
}
