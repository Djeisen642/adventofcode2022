import { join } from 'path';

import { dayOnePartOne, dayOnePartTwo } from '@/day1/index';

describe('day1', () => {
  describe('part1', () => {
    it('should match the test result', async () => {
      const answer = 24000;
      const filePath = join(__dirname, 'input1.example1.txt');

      const result = await dayOnePartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 32000;
      const filePath = join(__dirname, 'input1.example2.txt');

      const result = await dayOnePartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input1.txt');
      const result = await dayOnePartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day1 part1 result: ', result);
    });
  });

  describe('part2', () => {
    it('should match the test result', async () => {
      const answer = 45000;
      const filePath = join(__dirname, 'input1.example1.txt');

      const result = await dayOnePartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 67000;
      const filePath = join(__dirname, 'input1.example2.txt');

      const result = await dayOnePartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input1.txt');

      const result = await dayOnePartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day1 part2 result: ', result);
    });
  });
});
