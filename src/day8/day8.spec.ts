import { join } from 'path';

import { dayEightPartOne, dayEightPartTwo } from '@/day8/index';

describe('day8', () => {
  describe('part1', () => {
    it('should match the test result', async () => {
      const answer = 21;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await dayEightPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 23;
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await dayEightPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await dayEightPartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day8 part1 result: ', result);
    });
  });

  describe('part2', () => {
    it('should match the test result', async () => {
      const answer = 8;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await dayEightPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await dayEightPartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day8 part2 result: ', result);
    });
  });
});
