const { createHash } = await import('node:crypto');
import path from 'path';
import fs from 'fs';
const hashFile = async filePath => {
  return new Promise(function (resolve, reject) {
      const hash = createHash('sha256');
      let input = fs.createReadStream(path.resolve(process.cwd(), filePath));
      input.on('readable', async () => {
        const data = input.read();
        if (data) hash.update(data);
        else {
          process.stdout.write(`${hash.digest('hex')}\n`);
        }
      });
      input.on('end', () => {
        resolve();
      });
      input.on('error', () => {
        process.stdout.write(`Operation failed\n`)
      });
    
  });
  try {
    const hash = createHash('sha256');
    const input = fs.createReadStream(path.resolve(process.cwd(), filePath));
    input.on('readable', async () => {
      const data = input.read();
      if (data) hash.update(data);
      else {
        process.stdout.write(`${hash.digest('hex')}\n`);
      }
    });
  } catch (error) {
    process.stdout.write(`Operation failed\n`);
    console.log(error);
  }
};

export default hashFile;
