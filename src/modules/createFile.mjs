import fs from 'fs';
import path from 'path';
const createFile = async filePath => {
  return new Promise(function (resolve, reject) {
    const stream = fs.createWriteStream(path.resolve(process.cwd(), filePath), { flags: 'a' });
    const r = fs.createReadStream(path.resolve(process.cwd(), filePath));
    r.on('error', err => {
      stream.write('', function () {
        process.stdout.write(`File ${filePath} created successfully\n`);
        resolve();
      });
      stream.on('finish', function () {
        process.stdout.write(`File ${filePath} created successfully\n`);
        resolve();
      });
      stream.on('error', function (err) {
        process.stdout.write(`Operation failed\n`);
        resolve();
      });
    })
    r.on('readable', () => {
      resolve();
    })
  });
};

export default createFile;
