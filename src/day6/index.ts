import * as fs from 'node:fs/promises';

export async function daySixPartOne(filePath: string): Promise<number> {
  const numberOfCheckedCharacters = 4;
  return calculate(filePath, numberOfCheckedCharacters);
}

export async function daySixPartTwo(filePath: string): Promise<number> {
  const numberOfCheckedCharacters = 14;
  return calculate(filePath, numberOfCheckedCharacters);
}

async function calculate(
  filePath: string,
  numberOfCheckedCharacters: number
): Promise<number> {
  const line = await fs.readFile(filePath, 'utf-8');
  const currentSetOfCharacters: string[] = [];
  const numberOfCharacters: Record<string, number> = {};
  return (
    line.split('').findIndex((character) => {
      currentSetOfCharacters.push(character);
      if (character in numberOfCharacters) {
        numberOfCharacters[character]++;
      } else {
        numberOfCharacters[character] = 1;
      }
      if (currentSetOfCharacters.length < numberOfCheckedCharacters) {
        return false;
      }
      if (
        currentSetOfCharacters.every(
          (character) => numberOfCharacters[character] === 1
        )
      ) {
        return true;
      }
      const removedChar = currentSetOfCharacters.shift();
      if (removedChar) numberOfCharacters[removedChar]--;

      return false;
    }) + 1 // zero index...
  );
}
