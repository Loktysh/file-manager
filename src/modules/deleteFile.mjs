import fs from 'fs';
const deleteFile = async (filePath) => {
  if (!filePath) {
    process.stdout.write(`Invalid input\n`);
    return null;
  }
  return new Promise(function (resolve, reject) {
    fs.rm(filePath, err => {
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

export default deleteFile;
