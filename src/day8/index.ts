import { createSimpleLogger } from 'simple-node-logger';

import { messages } from '@/utils/messages';
import { readlines } from '@/utils/readlines';

const logger = createSimpleLogger({ level: 'error' });

async function getTrees(
  filePath: string
): Promise<{ trees: number[][]; rows: number; columns: number }> {
  const trees: number[][] = [];
  let columns = 0;
  for await (const line of readlines(filePath)) {
    const row = line.split('');
    columns = row.length;
    trees.push(row.map((char) => +char));
  }
  const rows = trees.length;
  return { trees, rows, columns };
}

export async function dayEightPartOne(filePath: string): Promise<number> {
  const { trees, rows, columns } = await getTrees(filePath);
  let visibleTrees = 0;

  const addTree = (direction: string, row: number, column: number) => {
    logger.info(`${direction} ${row} ${column}`);
    visibleTrees++;
  };
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = trees[rowIndex];
    if (!row) throw new Error(messages.UnexpectedError);
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const thisTree = row[columnIndex];
      if (typeof thisTree === 'undefined')
        throw new Error(messages.UnexpectedError);

      let left = false;
      let max = -1;
      for (
        let anotherColumnIndex = 0;
        anotherColumnIndex < columns;
        anotherColumnIndex++
      ) {
        const anotherTree = row[anotherColumnIndex];
        if (typeof anotherTree === 'undefined')
          throw new Error(messages.UnexpectedError);
        if (anotherColumnIndex === columnIndex) {
          left = max < thisTree;
          max = -1;
          continue;
        }
        max = Math.max(max, anotherTree);
      }
      const right = max < thisTree;
      if (left || right) {
        const direction = left ? 'left' : 'right';
        addTree(direction, rowIndex, columnIndex);
        continue;
      }
      let up = false;
      max = -1;
      for (let anotherRowIndex = 0; anotherRowIndex < rows; anotherRowIndex++) {
        const anotherTree = trees[anotherRowIndex]?.[columnIndex];
        if (typeof anotherTree === 'undefined')
          throw new Error(messages.UnexpectedError);
        if (anotherRowIndex === rowIndex) {
          up = max < thisTree;
          max = -1;
          continue;
        }
        max = Math.max(max, anotherTree);
      }
      const down = max < thisTree;
      if (up || down) {
        const direction = up ? 'up' : 'down';
        addTree(direction, rowIndex, columnIndex);
      }
    }
  }

  return visibleTrees;
}

export async function dayEightPartTwo(filePath: string): Promise<number> {
  const { trees, rows, columns } = await getTrees(filePath);
  let bestTreeScore = 0;

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = trees[rowIndex];
    if (!row) throw new Error(messages.UnexpectedError);
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const thisTree = row[columnIndex];
      if (typeof thisTree === 'undefined')
        throw new Error(messages.UnexpectedError);

      let leftDistance = 0;
      for (
        let anotherColumnIndex = columnIndex - 1;
        anotherColumnIndex >= 0;
        anotherColumnIndex--
      ) {
        const anotherTree = row[anotherColumnIndex];
        if (typeof anotherTree === 'undefined')
          throw new Error(messages.UnexpectedError);
        leftDistance++;
        if (anotherTree >= thisTree) {
          break;
        }
      }
      let rightDistance = 0;
      for (
        let anotherColumnIndex = columnIndex + 1;
        anotherColumnIndex < columns;
        anotherColumnIndex++
      ) {
        const anotherTree = row[anotherColumnIndex];
        if (typeof anotherTree === 'undefined')
          throw new Error(messages.UnexpectedError);
        rightDistance++;
        if (anotherTree >= thisTree) {
          break;
        }
      }

      let upDistance = 0;
      for (
        let anotherRowIndex = rowIndex - 1;
        anotherRowIndex >= 0;
        anotherRowIndex--
      ) {
        const anotherTree = trees[anotherRowIndex]?.[columnIndex];
        if (typeof anotherTree === 'undefined')
          throw new Error(messages.UnexpectedError);
        upDistance++;
        if (anotherTree >= thisTree) {
          break;
        }
      }

      let downDistance = 0;
      for (
        let anotherRowIndex = rowIndex + 1;
        anotherRowIndex < rows;
        anotherRowIndex++
      ) {
        const anotherTree = trees[anotherRowIndex]?.[columnIndex];
        if (typeof anotherTree === 'undefined')
          throw new Error(messages.UnexpectedError);
        downDistance++;
        if (anotherTree >= thisTree) {
          break;
        }
      }

      bestTreeScore = Math.max(
        bestTreeScore,
        leftDistance * rightDistance * upDistance * downDistance
      );
    }
  }

  return bestTreeScore;
}
