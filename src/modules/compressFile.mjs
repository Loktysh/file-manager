const zlib = await import('node:zlib');
import path from 'path';
import fs from 'fs';
const compressFile = async (filePath, destPath) => {
  if (!filePath || !destPath) {
    process.stdout.write(`Invalid input\n`);
    return null;
  }
  return new Promise(function (resolve, reject) {
    const input = fs.createReadStream(path.resolve(process.cwd(), filePath));
    const output = fs.createWriteStream(path.resolve(process.cwd(), destPath));
    const brotli = zlib.createBrotliCompress();
    input.on('error', async () => {
      process.stdout.write(`Operation failed\n`);
      resolve();
    });
    const stream = input.pipe(brotli).pipe(output);
    stream.on('finish', () => {
      process.stdout.write(`Successfully compressed ${filePath} to ${destPath}\n`);
      resolve();
    });
    stream.on('error', () => {
      process.stdout.write(`Operation failed\n`);
      resolve();
    });
  });
};

export default compressFile;
