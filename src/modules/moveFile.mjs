import path from 'path';
import fs from 'fs';
const moveFiles = async (filePath, destPath) => {
  if (!filePath || !destPath) {
    process.stdout.write(`Invalid input\n`);
    return null;
  }
  return new Promise(function (resolve, reject) {
    const input = fs.createReadStream(path.resolve(process.cwd(), filePath));
    const output = fs.createWriteStream(path.resolve(process.cwd(), destPath));
    input.on('error', async () => {
      process.stdout.write(`Operation failed\n`);
      resolve();
    });
    fs.rename(path.resolve(process.cwd(), filePath), path.resolve(process.cwd(), destPath), function (err) {
      if (err) {
        process.stdout.write(`Operation failed\n`);
        resolve();
      } else {
        process.stdout.write(`Operation successful\n`);
        resolve();
      }
    })
  });
};

export default moveFiles;
