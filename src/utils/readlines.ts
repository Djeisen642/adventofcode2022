import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export async function* readlines(filepath: string) {
  const readStream = createReadStream(filepath);
  const rl = createInterface(readStream);
  for await (const line of rl) {
    yield line;
  }
}
