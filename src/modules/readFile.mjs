import fs from 'fs';
import path from 'path';
import { stdout as output } from 'process';
const readFile = async filePath => {
  try {
    const r = fs.createReadStream(path.resolve(process.cwd(), filePath));
    const w = output;
    for await (const chunk of r) {
      w.write(chunk + '\n');
    }
  } catch (error) {
    output.write(`Operation failed\n`);
  }
};

export default readFile;
