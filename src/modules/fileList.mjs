import { readdir } from 'fs/promises';
const fileList = async folderPath => {
  const files = await readdir(process.cwd(), { withFileTypes: true });
  const fileNames = files.map(file => file.name);
  console.log(fileNames);
};

export default fileList;
