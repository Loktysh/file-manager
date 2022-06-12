import { stdin as input, stdout as output } from 'process';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { homedir } from 'os';
import fileList from './modules/fileList.mjs';
import changeDirectory from './modules/changeDirectory.mjs';
import systemInfo from './modules/systemInfo.mjs';
import hashFile from './modules/hashFile.mjs';
import compressFile from './modules/compressFile.mjs';
import decompressFile from './modules/compressFile.mjs';
import readFile from './modules/readFile.mjs';
import createFile from './modules/createFile.mjs';
import renameFile from './modules/renameFile.mjs';
import deleteFile from './modules/deleteFile.mjs';
import copyFiles from './modules/copyFiles.mjs';
import moveFile from './modules/moveFile.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folderPath = path.join(__dirname, 'files');
const rl = readline.createInterface({ input, output });
const onClose = () => {
  output.write(`Thank you for using File Manager, ${process.env.username}!`);
  rl.close();
};
const init = async () => {
  let dir = homedir();
  process.chdir(dir);
  const isCmdValid = (cmd) => {
    return /^cd\s|^cat\s|^add\s|^rn\s|^rm\s|^cp\s|^mv\s|^compress\s|^decompress\s|^hash\s|^ls$|^up$|^.exit$|^os\s/.test(cmd);
  }
  output.write(`Welcome to the File Manager, ${process.env.username}!\n`);
  output.write(`You are currently in ${process.cwd()}\n`);
  rl.on('line', async line => {
    if (isCmdValid(line)) {
      if (/^up$/.test(line)) {
        changeDirectory(dir, '..');
      }
      if (/^cd\s/.test(line)) {
        changeDirectory(dir, line.split(' ')[1]);
      }
      if (/^cat\s/.test(line)) {
        await readFile(line.split(' ')[1]);
      }
      if (/^add\s/.test(line)) {
        await createFile(line.split(' ')[1]);
      }
      if (/^rn\s/.test(line)) {
        await renameFile(line.split(' ')[1], line.split(' ')[2]);
      }
      if (/^rm\s/.test(line)) {
        await deleteFile(line.split(' ')[1]);
      }
      if (/^cp\s/.test(line)) {
        await copyFiles(line.split(' ')[1], line.split(' ')[2]);
      }
      if (/^mv\s/.test(line)) {
        await moveFile(line.split(' ')[1], line.split(' ')[2]);
      }
      if (/^ls$/.test(line)) {
        fileList(dir);
      }
      if (/^hash\s/.test(line)) {
        await hashFile(line.split(' ')[1]);
      }
      if (/^compress\s/.test(line)) {
        await compressFile(line.split(' ')[1], line.split(' ')[2]);
      }
      if (/^decompress\s/.test(line)) {
        await decompressFile(line.split(' ')[1], line.split(' ')[2]);
      }
      if (/^os\s/.test(line)) {
        systemInfo(line.split('--')[1]);
      }
      if (line === '.exit') {
        onClose();
      }
      output.write(`You are currently in ${process.cwd()}\n`);
    } else {
      output.write(`Invalid input\n`);
    }
  });
  rl.on('resume', () => {
    output.write('Readline resumed.');
  });
  rl.on('SIGINT', () => {
    onClose();
  });
};
init();
