import fs from 'fs';
import path from 'path';
const createFile = async (oldName, newName) => {
  if (!oldName || !newName) {
    process.stdout.write(`Invalid input\n`);
    return null;
  }
  return new Promise(function (resolve, reject) {
    fs.rename(oldName, newName, err => {
      if (err) {
        process.stdout.write(`Operation failed\n`);
        resolve();
      } else {
        process.stdout.write(`Operation successful\n`);
        resolve();
      }
    });
  });
};

export default createFile;
