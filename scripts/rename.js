const shell = require("shelljs");
const path = require("path");

serviceLayer = (ext) =>
  path.join(process.cwd(), `src/backend/ServiceLayer.${ext}`);

// Renaming files to make them available on both FE and BE
if (shell.test("-e", serviceLayer("js"))) {
  shell.mv(serviceLayer("js"), serviceLayer("jsw"));
} else {
  console.warn(`Warning: ${serviceLayer("js")} does not exist`);
}
