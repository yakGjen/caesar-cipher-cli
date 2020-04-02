const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');
const { program } = require('commander');

const { handleErrors } = require('./functions');
const { askingFunc } = require('./functions');
const { checkRegister } = require('./functions');


program
  .option('-i, --input <input>', 'input')
  .option('-s, --shift <shift>', 'shift')
  .option('-o, --output <output>', 'output')
  .option('-a, --action <action>', 'action');

program.parse(process.argv);

const options = program.opts();
console.log(options);
console.log(program.action);


const alfabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


/*const args = process.argv;

const actionType = args[2];
const actionName = args[3];

const shiftType = args[4];
const shiftName = args[5];

const inputType = args[6];
const inputName = args[7];

const outputType = args[8];
const outputName = args[9];*/


const transformData = (data, shiftName) => {
  const prepareData = data.split('');

  if (actionName === 'encode') {
    return encodeData(prepareData, +shiftName);
  }
  if (actionName === 'decode') {
    decodeData(prepareData, +shiftName);
  }
};

const decodeData = (data, shift) => {
  const result = data.map((item) => {
    const index = alfabet.findIndex(elem => elem === item.toLowerCase()) - shift;
    if (index < 0) {
      return alfabet[alfabet.length - Math.abs(index)];
    }
    return alfabet[index];
  });

  return result.join('');
};

const encodeData = (data, shift) => {
  const result = data.map((item) => {
    const foundIndex = alfabet.findIndex(elem => elem === item.toLowerCase());
    
    if (foundIndex < 0) {
      return item;
    }
    const index = foundIndex + shift;
    if (index >= alfabet.length) {
      return checkRegister(item, alfabet[index - alfabet.length]);
    }
    return checkRegister(item, alfabet[index]);
  });

  return result.join('');
};

 function getData(inputType, inputName) {

  handleErrors( 
    actionType, 
    actionName, 
    shiftType, 
    shiftName, 
    inputType
  );

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
getData(program.input);