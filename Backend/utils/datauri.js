import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
  //path.extName ->cut the extensition of the file(like .png, .jpg etc)

  //parser.format->format method extName (file extension) aur file.buffer (file data) ko combine karke Data URI format mein convert karta hai.

  //.content: Ye Data URI se actual base64 string ko nikalta hai.//

  //file.buffer-> filedata

  const extName = path.extname(file.originalName).toString();
  return parser.format(extName, file.buffer).content;
};
export default getDataUri;
