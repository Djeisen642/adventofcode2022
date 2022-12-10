import { join } from 'path';

import {
  Command,
  Direction,
  dayNinePartOne,
  dayNinePartTwo,
  getCommands,
  moveHead,
  moveTail,
  moveTailV2,
} from '@/day9';

describe('day9', () => {
  describe('part1', () => {
    it('should get a list of commands', async () => {
      const firstExpectedCommand: Command = {
        direction: Direction.RIGHT,
        distance: 4,
      };
      const lastExpectedCommand: Command = {
        direction: Direction.RIGHT,
        distance: 2,
      };
      const filePath = join(__dirname, 'input.example1.txt');

      const commandIterator = getCommands(filePath);

      let firstCommand;
      let lastCommand;
      for await (const command of commandIterator) {
        if (!firstCommand) {
          firstCommand = command;
        }
        lastCommand = command;
      }

      expect(firstCommand).toEqual(firstExpectedCommand);
      expect(lastCommand).toEqual(lastExpectedCommand);
    });
    it('should move the head to the correct spot', async () => {
      const filePath = join(__dirname, 'input.example1.txt');
      const commands = getCommands(filePath);

      const iterator = moveHead(commands);

      let result;
      for await (const coordinate of iterator) {
        result = coordinate;
      }
      expect(result).toEqual({ x: 2, y: 2 });
    });
    it('should move the tail to the correct spot', async () => {
      const filePath = join(__dirname, 'input.example1.txt');
      const commands = getCommands(filePath);

      const headIterator = moveHead(commands);
      const tailIterator = moveTail(headIterator);

      let result;
      for await (const coordinate of tailIterator) {
        result = coordinate;
      }
      expect(result).toEqual({ x: 1, y: 2 });
    });
    it('should match the test result', async () => {
      const answer = 13;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await dayNinePartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 16;
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await dayNinePartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await dayNinePartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day9 part1 result: ', result);
    });
  });

  describe('dayNinePartTwo', () => {
    it('should move the head to the correct spot', async () => {
      const filePath = join(__dirname, 'input.example3.txt');
      const commands = getCommands(filePath);

      const iterator = moveHead(commands);

      let result;
      for await (const coordinate of iterator) {
        result = coordinate;
      }
      expect(result).toEqual({ x: -11, y: 15 });
    });
    it('should move the tail to the correct spot', async () => {
      const filePath = join(__dirname, 'input.example1.txt');
      const commands = getCommands(filePath);

      const headIterator = moveHead(commands);
      const tailIterator = moveTailV2(headIterator, 1);

      let result;
      for await (const coordinate of tailIterator) {
        result = coordinate;
      }
      expect(result).toEqual({ x: 1, y: 2 });
    });
    it('should move the tail on a larger example to the correct spot', async () => {
      const filePath = join(__dirname, 'input.example3.txt');
      const commands = getCommands(filePath);

      const headIterator = moveHead(commands);
      const tailIterator = moveTailV2(headIterator, 9);

      let result;
      for await (const coordinate of tailIterator) {
        result = coordinate;
      }
      expect(result).toEqual({ x: -11, y: 6 });
    });
    it('should match the test result', async () => {
      const answer = 1;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await dayNinePartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the third test result', async () => {
      const answer = 36;
      const filePath = join(__dirname, 'input.example3.txt');

      const result = await dayNinePartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await dayNinePartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day9 part2 result: ', result);
    });
  });
});
