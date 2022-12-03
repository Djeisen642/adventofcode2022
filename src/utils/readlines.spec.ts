import { rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

import { readlines } from '@/utils/readlines';

describe('readlines', () => {
  it('should read lines from a txt file', async () => {
    const lines = ['this', 'is', 'an', 'example'];
    const tmpFile = 'tmp.txt';
    const tmpPath = join(tmpdir(), tmpFile);
    await writeFile(tmpPath, lines.join('\n'));
    let index = 0;
    for await (const line of readlines(tmpPath)) {
      expect(line).toBe(lines[index++]);
    }
    await rm(tmpPath);
  });
});
