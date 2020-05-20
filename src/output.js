const fs = require('fs');
const util = require('util');

const checkFile = util.promisify(fs.access);


module.exports.createOutputStream = async (path) => {
  console.log('pathOut', path);
  if (typeof path !== 'string') {
    return process.stdout;
  }

  /*const promise = new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK | fs.constants.R_OK, (data) => {
      if (!data) {
        // console.log('out norm');
        resolve('out norm');
      } else {
        // console.log('err with path');
        resolve('err with path');
      }
    });
  });

  const result = await promise;
  return result;*/
  return await checkFile(path, fs.constants.F_OK | fs.constants.R_OK)
    .then(data => {
      console.log('The write stream was created.');
      return fs.createWriteStream(path, {
        flags: 'a',
        encoding: 'utf8'
      });
    })
    .catch(() => {
      console.error('File can`t to write or not exist.');
      return process.stdout;
    });
};