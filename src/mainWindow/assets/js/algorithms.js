let algorithms = {
  crypto: {
    
    128: {
      key: undefined,
      iv: undefined,
    },
    192: {
      key: undefined,
      iv: undefined,
    },
    256: {
      key: undefined,
      iv: undefined,
    },
    ciphers: {},

    encrypt(text, algorithm) {
      // encrypt string

      let key = Buffer.from(config.input[algorithm.split('-')[1]].key);
      let iv = Buffer.from(config.input[algorithm.split('-')[1]].iv);
      let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return encrypted.toString('hex');
    },

    decrypt(text, algorithm, base) {
      // decrypt
      let key = Buffer.from(config.input[algorithm.split('-')[1]].key);
      let iv = Buffer.from(config.input[algorithm.split('-')[1]].iv);
      let encryptedText = Buffer.from(text, 'hex');
      let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    },

    generateKey(base, keyBytes) {
      config.input[base].key = crypto.randomBytes(keyBytes);
      config.input[base].iv = crypto.randomBytes(16);
    }
  },
  sea: {
    encrypt(text, key) {  
      let final = '';
      // iterate through ever character
      for(let i = 0; i < text.length; i++) {
        // convert character to ascii
        let ascii = text.charCodeAt(i);
        
        // shift ascii code
        ascii += key;

        // convert ascii int back to character and assemble final string
        final += String.fromCharCode(ascii);
      }
      return final;
    },

    decrypt(text, key) {
      let final = '';
      for(let i = 0; i < text.length; i++) {
        // convert character to ascii
        let ascii = text.charCodeAt(i);

        // shift ascii code
        ascii -= key;

        // convert ascii int back to character and assemble final string
        final += String.fromCharCode(ascii);
      }
      return final;
    }
  }
}