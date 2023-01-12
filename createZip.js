const zipper = require('zip-local');
const del = require('del');
const fs = require('fs');
const path = require('path')
const argv = require('yargs').argv;

function sleep(times) {
  return new Promise(resolve => {
    setTimeout(resolve, times);
  });
}

(async function () {
  let { dir, name, target } = argv;
  if (dir && name) {
    dir = path.resolve(process.cwd(), dir);
    const zipFile = path.resolve(`${path.dirname(dir)}/${target}`, name);
    const isExistDir = fs.existsSync(dir);
    const isExistZip = fs.existsSync(zipFile);
    if (isExistZip) {
      del.sync([zipFile]);
    }
    if (dir && isExistDir && zipFile) {
      zipper.sync.zip(dir).compress().save(zipFile);
      del.sync([`build/**/*`, `!build/shihegangh5.zip`], { cwd: path.dirname(`${dir}`) });
    }
  }
})();
