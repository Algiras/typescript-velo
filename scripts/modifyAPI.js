const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "src/public/API.js");

/**
 * Because only BE files are imported with `jsw` we need to replace the existing import to the API
 */
fs.readFile(filePath, "utf8", function (err, data) {
  if (err) {
    return console.error(err);
  }

  // split the file content into lines
  let lines = data.split("\n");

  // replace the first line
  lines[0] = 'import * as API from "backend/ServiceLayer.jsw";';

  // join the lines back into a single string
  let output = lines.join("\n");

  // compile and run the modified TypeScript code
  fs.writeFile(path.join(process.cwd(), "src/public/API.js"), output, (err) => {
    err && console.error(err);
  });
});
