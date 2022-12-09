import { join } from 'path';

import { daySevenPartOne, daySevenPartTwo } from '@/day7';

describe('day7', () => {
  describe('part1', () => {
    it('should match the test result', async () => {
      const answer = 95437;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await daySevenPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 102771;
      const filePath = join(__dirname, 'input.example2.txt');

      const result = await daySevenPartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await daySevenPartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day5 part1 result: ', result);
    });
  });

  describe('part2', () => {
    it('should match the test result', async () => {
      const answer = 24933642;
      const filePath = join(__dirname, 'input.example1.txt');

      const result = await daySevenPartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input.txt');
      const result = await daySevenPartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day5 part2 result: ', result);
    });
  });
});
