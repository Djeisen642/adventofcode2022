import { messages } from '@/utils/messages';
import { readlines } from '@/utils/readlines';

type File = number;
type FileOrDir = FileOrDir[] | File;
const theDirSpecialName = 'the_dir';
const thePrevDirSpecialName = 'prev_dir';

type DirStructure = Map<string, DirStructure | FileOrDir>;

enum COMMANDS {
  LIST = 'ls',
  CHANGE_DIR = 'cd',
}

export async function daySevenPartOne(filePath: string): Promise<number> {
  const treshhold = 100000;
  const directories: FileOrDir[] = await parseDirectory(filePath);
  const { allDirSizes } = calculateDirSize(directories);
  return allDirSizes
    .filter((dirSize) => dirSize < treshhold)
    .reduce((sum, dirSize) => sum + dirSize, 0);
}

export async function daySevenPartTwo(filePath: string): Promise<number> {
  const totalSize = 70000000;
  const requiredRemainingSize = 30000000;
  const directories: FileOrDir[] = await parseDirectory(filePath);
  const { allDirSizes } = calculateDirSize(directories);
  allDirSizes.sort((a, b) => a - b);
  const totalUsedSize = allDirSizes[allDirSizes.length - 1];
  if (!totalUsedSize) throw new Error(messages.UnexpectedError);
  const sizeToTrim = -(totalSize - requiredRemainingSize - totalUsedSize);
  const dirToDelete = allDirSizes.find((dirSize) => dirSize > sizeToTrim);
  if (!dirToDelete) throw new Error(messages.UnexpectedError);
  return dirToDelete;
}

async function parseDirectory(filePath: string): Promise<FileOrDir[]> {
  const directories: FileOrDir[] = [];
  const dirStructure: DirStructure = new Map([
    [theDirSpecialName, directories],
  ]);
  let currentDirectory = dirStructure;
  let listing = false;
  for await (const line of readlines(filePath)) {
    const match = line.match(/\$ ([a-zA-Z]+)(.*)/);
    if (match && match.length === 3) {
      listing = false;
      const command = match[1];
      if (command === COMMANDS.CHANGE_DIR) {
        let dir = match[2];
        if (!dir) throw new Error(messages.UnexpectedError);
        dir = dir.trim();
        if (dir === '/') {
          currentDirectory = dirStructure;
        } else if (dir === '..') {
          const directory = currentDirectory.get(thePrevDirSpecialName);
          if (!directory || !(directory instanceof Map))
            throw new Error(messages.UnexpectedError);
          currentDirectory = directory;
        } else {
          const directory = currentDirectory.get(dir);
          if (!directory || !(directory instanceof Map))
            throw new Error(messages.UnexpectedError + ' - ' + dir);
          currentDirectory = directory;
        }
      } else if (command === COMMANDS.LIST) {
        listing = true;
      }
    } else if (listing) {
      const match = line.match(/(\S*) (\S*)/);
      if (match && match.length === 3) {
        const [, sizeOrType, name] = match;
        const dirArray = currentDirectory.get(theDirSpecialName);
        if (!name) throw new Error(messages.UnexpectedError);
        if (!dirArray || !Array.isArray(dirArray))
          throw new Error(messages.UnexpectedError);
        if (!sizeOrType) throw new Error(messages.UnexpectedError);
        if (sizeOrType === 'dir') {
          const newDirectory: FileOrDir = [];
          const entries: [string, FileOrDir | DirStructure][] = [
            [theDirSpecialName, newDirectory],
            [thePrevDirSpecialName, currentDirectory],
          ];
          currentDirectory.set(name, new Map(entries));
          dirArray.push(newDirectory);
        } else if (!isNaN(+sizeOrType)) {
          dirArray.push(+sizeOrType);
        } else {
          throw new Error(messages.UnexpectedError);
        }
      } else {
        throw new Error(messages.UnexpectedError);
      }
    }
  }
  return directories;
}

function calculateDirSize(directory: FileOrDir[]): {
  dirSize: number;
  allDirSizes: number[];
} {
  let dirSize = 0;
  const allDirSizes = [];
  for (const directoryElement of directory) {
    if (Array.isArray(directoryElement)) {
      const { dirSize: thisDirSize, allDirSizes: newAllDirectorySizes } =
        calculateDirSize(directoryElement);
      dirSize += thisDirSize;
      allDirSizes.push(...newAllDirectorySizes);
    } else {
      dirSize += directoryElement;
    }
  }
  allDirSizes.push(dirSize);
  return { dirSize, allDirSizes };
}

// export async function daySevenPartTwo(filePath: string): Promise<number> {}
