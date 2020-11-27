/*
* Name: Hamza Alsarakbi
* Teacher: Mr. Schwartz
* Assignment: Encryption Algorithms "Tashfeer"
* Date: November 27th, 2020
*/


const crypto = require('crypto');

function initalize() {
  // get all the ciphers
  let ciphers = crypto.getCiphers();

  // create a checkbox for ever cipher
  let column1 = document.querySelector('.column#crypto-1');
  for (let i = 0; i < ciphers.length; i++) {
    let container = addElement('label', { class: 'checkbox-container' }, removedashes(ciphers[i]).toUpperCase(), column1);
    addElement('input', { type: 'checkbox', onclick: 'parameterEdit(this)', ['data-algorithm']: 'crypto1', id: ciphers[i] }, '', container);
    addElement('span', { class: 'checkmark' }, '', container);
  }
  addElement('button', { class: 'generate', id: 'crypto-1-generate-key', onclick: 'algorithms.crypto1.generateKey()' }, 'Generate Key', column1);
}
initalize();



function removedashes(text) {
  // split the text into arrays
  let texts = text.split('-');
  let final = '';

  // reassemble the string with spaces intsead of dashes
  for (let i = 0; i < texts.length; i++) {
    final += ' ' + texts[i];
  }
  // remove first space
  return final.replace(final.substring(0, 1), '');
}


let algorithms = {
  crypto1: {
    enabled: true,
    key: undefined,
    iv: undefined,
    algorithms: {},

    encrypt(text, algorithm) {
      // encrypt string
      let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    },

    decrypt(text, algorithm) {
      // decrypt
      let iv = Buffer.from(text.iv, 'hex');
      let encryptedText = Buffer.from(text.encryptedData, 'hex');
      let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    },

    generateKey() {
      this.key = crypto.randomBytes(32);
      this.iv = crypto.randomBytes(16);
    }
  }
}


function parameterEdit(e, type) {
  // if it is an algorithm
  if (type == 'algorithm') {
    algorithms[e.id].enabled = !algorithms[e.id].enabled;
  } else {
    if (e.checked) {
      // add to object
      algorithms[e.dataset.algorithm].algorithms[e.id] = e.id;
    } else {
      // remove from object
      delete algorithms[e.dataset.algorithm].algorithms[e.id];
    }
  }
}
function encrypt() {

}
