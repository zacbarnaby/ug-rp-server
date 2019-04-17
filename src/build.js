const fs = require('fs');
const path = require('path');
const process = require('process');
const globby = require('globby');
const exec =  require('child_process').execSync;

globby(['./src/**/package.json', '!**/node_modules/**/*'])
  .then((files) => {
    files.forEach((file) => {
      const package = JSON.parse(fs.readFileSync(file));
      if (!package.scripts || !package.scripts.dist) {
        console.warn(`"${package.name}" doesn't have a "dist" script.`);
        return;
      }

      const start = process.hrtime();
      process.chdir(path.dirname(file));
      //exec('npm install');
      exec('npm run dist');
      
      const end = process.hrtime(start);
      console.log(`"${package.name}" built in ${end[0]} seconds.`);
    });
  });
