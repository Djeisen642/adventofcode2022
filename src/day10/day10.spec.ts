import { join } from 'path';

import { CPUCommand, Instruction, getCommands } from '@/day10/index';

describe('day10', () => {
  describe('read input', () => {
    it('should read input for example 1', async () => {
      const expectedNumCommands = 3;
      const expectedFirstCommand: CPUCommand = {
        instruction: Instruction.NOOP,
      };
      const expectedLastCommand: CPUCommand = {
        instruction: Instruction.ADDX,
        number: -5,
      };

      const filePath = join(__dirname, 'input.example1.txt');
      const commandIterator = getCommands(filePath);

      let firstCommand;
      let lastCommand;
      let numCommands = 0;
      for await (const cpuCommand of commandIterator) {
        if (!firstCommand) firstCommand = cpuCommand;
        lastCommand = cpuCommand;
        numCommands++;
      }

      expect(numCommands).toEqual(expectedNumCommands);
      expect(firstCommand).toEqual(expectedFirstCommand);
      expect(lastCommand).toEqual(expectedLastCommand);
    });
    it('should read input for example 2', async () => {
      const expectedNumCommands = 146;
      const expectedFirstCommand: CPUCommand = {
        instruction: Instruction.ADDX,
        number: 15,
      };
      const expectedLastCommand: CPUCommand = {
        instruction: Instruction.NOOP,
      };

      const filePath = join(__dirname, 'input.example2.txt');
      const commandIterator = getCommands(filePath);

      let firstCommand;
      let lastCommand;
      let numCommands = 0;
      for await (const cpuCommand of commandIterator) {
        if (!firstCommand) firstCommand = cpuCommand;
        lastCommand = cpuCommand;
        numCommands++;
      }

      expect(numCommands).toEqual(expectedNumCommands);
      expect(firstCommand).toEqual(expectedFirstCommand);
      expect(lastCommand).toEqual(expectedLastCommand);
    });
  });
});
