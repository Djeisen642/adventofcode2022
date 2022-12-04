import { join } from 'path';

import { dayFourPartOne, dayFourPartTwo } from '@/day4';

describe('day4', () => {
  describe('part1', () => {
    it('should match the test result', async () => {
      const answer = 2;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await dayFourPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 3;
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await dayFourPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await dayFourPartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day3 part1 result: ', result);
    });
  });
  describe('part2', () => {
    it('should match the test result', async () => {
      const answer = 4;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await dayFourPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 5;
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await dayFourPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await dayFourPartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day3 part2 result: ', result);
    });
  });
});
