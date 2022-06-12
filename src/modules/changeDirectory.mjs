import { readdir } from 'fs/promises';
import { homedir } from 'os';
import path, { dirname } from 'path';
const changeDirectory = async (oldPath, newPath) => {
  // console.log('Current path: ', process.cwd());
  // console.log('New path: ', path.resolve(process.cwd(), newPath), homedir());
  if (path.resolve(process.cwd(), newPath).length >= homedir().length) {
    process.chdir(path.resolve(process.cwd(), newPath));
  }
};

export default changeDirectory;
