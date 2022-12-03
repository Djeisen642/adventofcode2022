import { join } from 'path';

import { dayTwoPartOne } from '@/day2/part1';
import { dayTwoPartTwo } from '@/day2/part2';

describe('day 2', () => {
  describe('part 1', () => {
    it('should match the test result', async () => {
      const answer = 15;
      const filePath = join(__dirname, 'input2.example1.txt');

      const result = await dayTwoPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 24;
      const filePath = join(__dirname, 'input2.example2.txt');

      const result = await dayTwoPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input2.txt');
      const result = await dayTwoPartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day2 part1 result: ', result);
    });
  });

  describe('part 2', () => {
    it('should match the test result', async () => {
      const answer = 12;
      const filePath = join(__dirname, 'input2.example1.txt');

      const result = await dayTwoPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 15;
      const filePath = join(__dirname, 'input2.example2.txt');

      const result = await dayTwoPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input2.txt');
      const result = await dayTwoPartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day2 part2 result: ', result);
    });
  });
});
