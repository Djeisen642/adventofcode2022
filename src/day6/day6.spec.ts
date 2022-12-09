import { join } from 'path';

import { daySixPartOne, daySixPartTwo } from '@/day6/index';

describe('day6', () => {
  describe('part1', () => {
    it('should match the test result', async () => {
      const answer = 7;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await daySixPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 5;
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await daySixPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the third test result', async () => {
      const answer = 6;
      const filePath = join(__dirname, 'input.example3.txt');

      const result = await daySixPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the fourth test result', async () => {
      const answer = 10;
      const filePath = join(__dirname, 'input.example4.txt');

      const result = await daySixPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the fifth test result', async () => {
      const answer = 11;
      const filePath = join(__dirname, 'input.example5.txt');

      const result = await daySixPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await daySixPartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day6 part1 result: ', result);
    });
  });

  describe('part2', () => {
    it('should match the test result', async () => {
      const answer = 19;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await daySixPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 23;
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await daySixPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the third test result', async () => {
      const answer = 23;
      const filePath = join(__dirname, 'input.example3.txt');

      const result = await daySixPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the fourth test result', async () => {
      const answer = 29;
      const filePath = join(__dirname, 'input.example4.txt');

      const result = await daySixPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the fifth test result', async () => {
      const answer = 26;
      const filePath = join(__dirname, 'input.example5.txt');

      const result = await daySixPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await daySixPartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day6 part2 result: ', result);
    });
  });
});
