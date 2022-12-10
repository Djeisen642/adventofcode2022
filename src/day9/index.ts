// import { messages } from '@/utils/messages';
// import { readlines } from '@/utils/readlines';
import { messages } from '@/utils/messages';
import { readlines } from '@/utils/readlines';

type Coordinate = {
  x: number;
  y: number;
};
export enum Direction {
  UP = 'U',
  DOWN = 'D',
  LEFT = 'L',
  RIGHT = 'R',
}
export type Command = {
  direction: Direction;
  distance: number;
};

export async function dayNinePartOne(filePath: string): Promise<number> {
  const commands: Command[] = await getCommands(filePath);

  const headMoveIterator = moveHead(commands);
  const tailMoveIterator = moveTail(headMoveIterator);

  const tailCoordinateSet = new Set();
  for (const coordinate of tailMoveIterator) {
    tailCoordinateSet.add(JSON.stringify(coordinate));
  }
  return tailCoordinateSet.size;
}

export async function dayNinePartTwo(filePath: string): Promise<number> {
  const knots = 10;
  const commands: Command[] = await getCommands(filePath);

  const headMoveIterator = moveHead(commands);
  const tailMoveIterator = moveTailV2(headMoveIterator, knots - 1); // subtract the head knot

  const tailCoordinateSet = new Set();
  for (const coordinate of tailMoveIterator) {
    tailCoordinateSet.add(JSON.stringify(coordinate));
  }
  return tailCoordinateSet.size;
}

export function moveTailV2(
  headMoveIterator: Generator<Coordinate>,
  knots: number
): Generator<Coordinate> {
  let currentIterator = headMoveIterator;
  for (let i = 0; i < knots; i++) {
    currentIterator = moveKnot(currentIterator);
  }
  return currentIterator;
}

export function* moveKnot(
  previousKnotIterator: Generator<Coordinate>
): Generator<Coordinate> {
  const thisKnotCoordinate: Coordinate = { x: 0, y: 0 };
  for (const prevKnotCoordinate of previousKnotIterator) {
    if (Math.abs(prevKnotCoordinate.x - thisKnotCoordinate.x) === 2) {
      const xDirection = prevKnotCoordinate.x > thisKnotCoordinate.x ? 1 : -1;
      thisKnotCoordinate.x += xDirection;
      if (Math.abs(prevKnotCoordinate.y - thisKnotCoordinate.y) > 0) {
        const yDirection = prevKnotCoordinate.y > thisKnotCoordinate.y ? 1 : -1;
        thisKnotCoordinate.y += yDirection;
      }
    } else if (Math.abs(prevKnotCoordinate.y - thisKnotCoordinate.y) === 2) {
      const yDirection = prevKnotCoordinate.y > thisKnotCoordinate.y ? 1 : -1;
      thisKnotCoordinate.y += yDirection;
      if (Math.abs(prevKnotCoordinate.x - thisKnotCoordinate.x) > 0) {
        const xDirection = prevKnotCoordinate.x > thisKnotCoordinate.x ? 1 : -1;
        thisKnotCoordinate.x += xDirection;
      }
    }
    yield thisKnotCoordinate;
  }
}

export function moveTail(
  headMoveIterator: Generator<Coordinate>
): Generator<Coordinate> {
  return moveKnot(headMoveIterator);
}

export function* moveHead(commands: Command[]): Generator<Coordinate> {
  const head: Coordinate = { x: 0, y: 0 };
  for (const command of commands) {
    for (let i = 0; i < command.distance; i++) {
      switch (command.direction) {
        case Direction.UP:
          head.y++;
          break;
        case Direction.DOWN:
          head.y--;
          break;
        case Direction.RIGHT:
          head.x++;
          break;
        case Direction.LEFT:
          head.x--;
          break;
      }
      yield head;
    }
  }
}

export async function getCommands(filePath: string) {
  const commands: Command[] = [];
  for await (const line of readlines(filePath)) {
    const [direction, distanceString] = line.split(' ');
    if (!direction || !distanceString)
      throw new Error(messages.UnexpectedError);
    const distance = +distanceString;
    if (isNaN(distance)) throw new Error(messages.UnexpectedError);
    commands.push({ direction: direction as Direction, distance });
  }
  return commands;
}
