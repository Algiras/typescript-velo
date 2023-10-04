const fs = require("fs");
const path = require("path");

// Read the JSON file
let packageJSON = JSON.parse(fs.readFileSync("package.json"));

/**
 * Remove the post-install script
 * This is required, so we would not require Wix permissions
 */
if (packageJSON.scripts && packageJSON.scripts.postinstall) {
  delete packageJSON.scripts.postinstall;
}

// Write the JSON file back
fs.writeFileSync("package.json", JSON.stringify(packageJSON, null, 2));

// Create the .wix directory
const dirPath = path.join(__dirname, ".wix");

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
