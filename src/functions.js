const readLine = require('readline');


module.exports.handleErrors = (actionType, actionName, shiftType, shiftName, inputType) => {
  if (actionType !== '-a' && actionType !== '--action') {
    console.error('error in an action command');
    process.exit(1);
  }

  if (actionName !== 'encode' && actionName !== 'decode') {
    console.error('error in an action name');
    process.exit(1);
  }

  if (shiftType !== '-s' && shiftType !== '--shift') {
    console.error('error in a shift command');
    process.exit(1);
  }

  if (typeof +shiftName !== 'number' ||  !+shiftName) {
    console.error('error: wrong a shift parameter');
    process.exit(1);
  }

  if (inputType !== '-i' && inputType !== '--input') {
    console.error('error in an input command');
    process.exit(1);
  }
};

module.exports.askingFunc = (shift, callback) => {
  const rLine = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rLine.question('Enter a word to encoding\n', (data) => {
    const result = callback(data, shift);
    //console.log(result);
    process.stdout.write(result);
    rLine.close();
  });
};

module.exports.checkRegister = (oldSymbol, newSymbol) => {
  if (oldSymbol === oldSymbol.toUpperCase()) {
    return newSymbol.toUpperCase();
  }
  return newSymbol.toLowerCase();
};