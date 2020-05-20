const alfabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const checkRegister = (oldSymbol, newSymbol) => {
  if (oldSymbol === oldSymbol.toUpperCase()) {
    return newSymbol.toUpperCase();
  }
  return newSymbol.toLowerCase();
};

const decodeData = (data, shift) => {
  /*console.log('data: ', data);
  console.log('shift: ', shift);*/
  const result = data.map((item) => {
    const foundIndex = alfabet.findIndex(elem => elem === item.toLowerCase());
    
    if (foundIndex < 0) {
      return item;
    }
    const index = foundIndex - shift;
    if (index < 0) {
      return checkRegister(item, alfabet[alfabet.length - Math.abs(index)]);
    }
    return checkRegister(item, alfabet[index]);
  });
  /*const result = data.map((item) => {
    const index = alfabet.findIndex(elem => elem === item.toLowerCase()) - shift;
    if (index < 0) {
      return alfabet[alfabet.length - Math.abs(index)];
    }
    return alfabet[index];
  });*/
  //console.log('res:', result.join(''));
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

module.exports.transformData = (data, shift, action) => {
  const prepareData = data.split('');

  if (action === 'encode') {
    return encodeData(prepareData, +shift);
  }
  if (action === 'decode') {
    decodeData(prepareData, +shift);
  }
};
