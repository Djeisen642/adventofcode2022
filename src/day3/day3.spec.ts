import { join } from 'path';

import { characterToPriority, dayThreePartOne, dayThreePartTwo } from '@/day3';

describe('day3', () => {
  describe('part1', () => {
    it('should return 1 if a is given', () => {
      const expected = 1;
      const result = characterToPriority('a');
      expect(result).toBe(expected);
    });
    it('should return 27 if A is given', () => {
      const expected = 27;
      const result = characterToPriority('A');
      expect(result).toBe(expected);
    });
    it('should return 52 if Z is given', () => {
      const expected = 52;
      const result = characterToPriority('Z');
      expect(result).toBe(expected);
    });
    it('should match the test result', async () => {
      const answer = 157;
      const filePath = join(__dirname, 'input3.example1.txt');

      const result = await dayThreePartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 15;
      const filePath = join(__dirname, 'input3.example2.txt');

      const result = await dayThreePartOne(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input3.txt');
      const result = await dayThreePartOne(filePath);
      expect(result).toBeTruthy();
      console.log('day3 part1 result: ', result);
    });
  });
  describe('part2', () => {
    it('should match the test result', async () => {
      const answer = 70;
      const filePath = join(__dirname, 'input3.example1.txt');

      const result = await dayThreePartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should match the second test result', async () => {
      const answer = 17;
      const filePath = join(__dirname, 'input3.example3.txt');

      const result = await dayThreePartTwo(filePath);
      expect(result).toBe(answer);
    });

    it('should run with the real deal', async () => {
      const filePath = join(__dirname, 'input3.txt');
      const result = await dayThreePartTwo(filePath);
      expect(result).toBeTruthy();
      console.log('day3 part2 result: ', result);
    });
  });
});
