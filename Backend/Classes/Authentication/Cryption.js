var sha512 = require("js-sha512");
var toDecimalConverter = require("hex2dec");

class Cryption {
  passwordToSHA512(password) {
    //transform the input value into a sha512 hashed string
    return sha512(password);
  }

  passwordToByteArray(password) {
    //Transform a raw password into a byte array.
    var str = sha512(password);
    let hexadecimalArray = str.match(/.{1,2}/g);
    let byteArray = [];
    hexadecimalArray.map((a) => {
      byteArray.push(Number(toDecimalConverter.hexToDec(a)));
    });
    return byteArray;
  }

  hashedPasswordToByteArray(hashedPassword) {
    //Transform a raw password into a byte array.
    var str = hashedPassword;
    let hexadecimalArray = str.match(/.{1,2}/g);
    let byteArray = [];
    hexadecimalArray.map((a) => {
      byteArray.push(Number(toDecimalConverter.hexToDec(a)));
    });
    return byteArray;
  }

  generateRandomHash() {
    const formatDecider = [];
    for (let a = 0; a < 5; a++) {
      Math.random() >= 0.5 ? formatDecider.push(true) : formatDecider.push(false);
    }

    let hashValue = "";

    formatDecider.map((a, b) => {
      let partValue;
      a == true ? (hashValue = hashValue + Math.random().toString(36).substring(1)) : (hashValue = hashValue + Math.random().toString().substring(1));
    });

    return this.passwordToSHA512(hashValue);
  }
}

module.exports = Cryption;
