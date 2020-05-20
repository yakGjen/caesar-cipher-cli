const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');
const { program } = require('commander');

const { validators } = require('./validators');
const { createOutputStream } = require('./output');
const { createInputStream } = require('./input');
const { transformData } = require('./transform-data');


program
  .option('-i, --input [input]', 'input')
  .option('-s, --shift <shift>', 'shift')
  .option('-o, --output [output]', 'output')
  .option('-a, --action <action>', 'action')
  .parse(process.argv);

const options = program.opts();
// console.log(options);


(async function() {

  /*const promise = new Promise(resolve => {
    const res = createOutputStream(options.output).then(data => {
      resolve(data);
    });
    console.log('res:', res);
  });

  const result = await promise;
  console.log('result:', result);
  console.log('BLA');*/
  validators(options);

  const inputStream = await createInputStream(options.input);
  const outputStream = await createOutputStream(options.output);
  console.log('strin:', typeof inputStream);
  console.log('str:', typeof outputStream);
  pipeline(
    inputStream,
    transformInputData,
    outputStream,
    (err) => {
      console.error('Some error with streams.');
      console.error('err:', err);
    }
  );

  console.log('BLA');
})();

const transformInputData = new Transform({
  transform(chunk, encoding, callback) {
    console.log('chunk:', chunk.toString());
    let resultChunk = transformData(chunk.toString(), options.shift, options.action);
    //console.log('result: ', resultChunk);
    // this.push(resultChunk + '\n');
    this.push(resultChunk);
    callback();
  }
});