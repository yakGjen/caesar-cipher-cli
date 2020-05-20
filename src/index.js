const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');
const { program } = require('commander');

const { validators } = require('./validators');
const { createOutputStream } = require('./output');


program
  .option('-i, --input <input>', 'input')
  .option('-s, --shift <shift>', 'shift')
  .option('-o, --output [output]', 'output')
  .option('-a, --action <action>', 'action')
  .parse(process.argv);

const options = program.opts();
// console.log(options);


async function a() {
  let promise = new Promise(resolve => {
    createOutputStream(options.output).then(data => {
      console.log('d', data);
      resolve('efge');
    });
  });
  let result = await promise;
  console.log('YO', result);
}
a();
//createOutputStream(options.output).then(data => console.log('d', data));
// console.log('res', res);
console.log('BLA');
//process.exit(1);
validators(options);

function getData(inputType, inputName) {

  fs.access(inputName, fs.constants.F_OK | fs.constants.R_OK, (data) => {
    if (!data) {
      pipeline(
        fs.createReadStream(inputName, 'utf8'),
        myTransform,
        fs.createWriteStream(outputName, {
          flags: 'a',
          encoding: 'utf8'
        }),
        (data) => console.log(data)
      );
    } else {
      pipeline(
        process.stdin,
        myTransform,
        process.stdout,
        (data) => console.log(data)
      );
    }
  });
};

const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    let resultChunk = transformData(chunk.toString(), shiftName);
    this.push(resultChunk + '\n');
    callback();
  }
});

//getData(inputType, inputName);
//getData(program.input);