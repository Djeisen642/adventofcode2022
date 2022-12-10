import { messages } from '@/utils/messages';
import { readlines } from '@/utils/readlines';

export enum Instruction {
  NOOP = 'noop',
  ADDX = 'addx',
}

export type CPUCommand = {
  instruction: Instruction;
  number?: number;
};
export async function* getCommands(
  filePath: string
): AsyncGenerator<CPUCommand> {
  for await (const line of readlines(filePath)) {
    const [instruction, numberString] = line.split(' ');
    if (!instruction) throw new Error(messages.UnexpectedError);
    const cpuCommand: CPUCommand = { instruction: instruction as Instruction };

    if (numberString) {
      const number = +numberString;
      if (isNaN(number)) throw new Error(messages.UnexpectedError);
      cpuCommand.number = number;
    }
    yield cpuCommand;
  }
}

// export async function *getOutputGenerator(commands: AsyncGenerator<CPUCommand>): AsyncGenerator<number> {
//
// }
