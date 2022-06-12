import fs from 'fs';
import path from 'path';
import { stdout as output } from 'process';
import { pipeline } from 'stream/promises';
const isFileExist = async (filePath) => {
  const r = fs.createReadStream(path.resolve(process.cwd(), filePath));
  const w = output;
  for await (const chunk of r) {
    w.write(chunk+'\n');
  }
};

export default isFileExist;
