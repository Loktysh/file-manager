import path from 'path';
import fs from 'fs';
const copyFiles = async (filePath, destPath) => {
  if (!filePath || !destPath) {
    process.stdout.write(`Invalid input\n`);
    return null;
  }
  console.log('np', path.resolve(process.cwd(), destPath))
  return new Promise(function (resolve, reject) {
    const input = fs.createReadStream(path.resolve(process.cwd(), filePath));
    const output = fs.createWriteStream(path.resolve(process.cwd(), destPath));
    input.on('error', async () => {
      process.stdout.write(`Operation failed\n`);
      resolve();
    });
    const stream = input.pipe(output);
    stream.on('finish', () => {
      process.stdout.write(`Successfully moved ${filePath} to ${destPath}\n`);
      resolve();
    });
    stream.on('error', () => {
      process.stdout.write(`Operation failed\n`);
      resolve();
    });
  });
};

export default copyFiles;
