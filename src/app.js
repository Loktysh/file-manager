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
    return /^cd\s|^cat\s|^compress\s|^decompress\s|^hash\s|^ls$|^up$|^.exit$|^os\s/.test(cmd);
  }
  // const files = await (async () => {
  //   const files = await fs.promises.readdir(folderPath, { withFileTypes: true });
  //   return files.map(file => file)
  // });
  // console.log(files)
  output.write(`Welcome to the File Manager, ${process.env.username}!\n`);
  output.write(`You are currently in ${process.cwd()}\n`);
  rl.on('line', async line => {
    // console.log(`Received: ${line}`);
    if (isCmdValid(line)) {
      if (/^up$/.test(line)) {
        changeDirectory(dir, '..');
      }
      if (/^cd\s/.test(line)) {
        changeDirectory(dir, line.split(' ')[1]);
      }
      if (/^cat\s/.test(line)) {
        await readFile(line.split(' ')[1]);
        // output.write(`\n`);
      }
      if (line === 'ls') {
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
