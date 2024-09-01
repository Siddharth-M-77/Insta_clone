import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
  // Extracting the file extension
  const extName = path.extname(file.originalname).toString();
  console.log(extName);


  // Converting file buffer to Data URI format
  return parser.format(extName, file.buffer).content;
};

export default getDataUri;
