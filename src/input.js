const fs = require('fs');
const util = require('util');

const checkFile = util.promisify(fs.access);

module.exports.createInputStream = async (path) => {
  console.log('pathIn:', path);
  if (typeof path !== 'string') {
    return process.stdin;
  }

  return await checkFile(path, fs.constants.F_OK | fs.constants.R_OK)
    .then(data => {
      console.log('The read stream was created.');
      return fs.createReadStream(path, 'utf8');
    })
    .catch(() => {
      console.error('File can`t to read or not exist.');
      return process.stdin;
    });
};