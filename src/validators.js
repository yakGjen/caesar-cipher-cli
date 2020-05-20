module.exports.validators = (options) => {
  if (options.action !== 'encode' && options.action !== 'decode') {
    console.error('Please, enter correct an action command!');
    process.exit(1);
  }
  if (!(+options.shift)) {
    console.error('Please, enter correct a shift value!');
    process.exit(1);
  }
  if (!options.output) {
    console.error('Please, enter correct an output command!');
    process.exit(1);
  }
  if (!options.input) {
    console.error('Please, enter correct an input command!');
    process.exit(1);
  }
};