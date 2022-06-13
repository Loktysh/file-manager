const zlib = await import('node:zlib');
import path from 'path';
import fs from 'fs';
const decompressFile = async (filePath, destPath) => {
  if (!filePath || !destPath) {
    process.stdout.write(`Invalid input\n`);
    return null;
  }
  return new Promise(function (resolve, reject) {
    const input = fs.createReadStream(path.resolve(process.cwd(), filePath));
    const output = fs.createWriteStream(path.resolve(process.cwd(), destPath));
    const brotli = zlib.createBrotliDecompress();
    const stream = input.pipe(brotli).pipe(output);
    input.on('error', async () => {
      process.stdout.write(`Operation failed\n`);
      resolve();
    });
    stream.on('finish', () => {
      process.stdout.write(`Successfully decompressed ${filePath} to ${destPath}\n`);
      resolve();
    });
    stream.on('error', () => {
      process.stdout.write(`Operation failed\n`);
      resolve();
    });
  });
};

export default decompressFile;
