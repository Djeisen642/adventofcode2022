import { join } from 'path';

import { dayFivePartOne, dayFivePartTwo } from '@/day5/index';

describe('day5', () => {
  describe('part1', () => {
    it('should match the test result', async () => {
      const answer = 'CMZ';
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await dayFivePartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 'CDBG';
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await dayFivePartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await dayFivePartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day5 part1 result: ', result);
    });
  });

  describe('part2', () => {
    it('should match the test result', async () => {
      const answer = 'MCD';
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await dayFivePartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 'DCAG';
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await dayFivePartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await dayFivePartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day5 part2 result: ', result);
    });
  });
});
