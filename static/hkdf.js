//const hkdf = require('futoin-hkdf');
//var crypto = require('crypto');

function hkey_derivation_function(data){

    var prime_length = 32;
    var diffHell = crypto.createDiffieHellman(prime_length);

    diffHell.generateKeys('base64');

//console.log(diffHell.generateKeys('base64'));
//console.log("Public Key : " ,diffHell.getPublicKey('base64'));
//console.log("Private Key : " ,diffHell.getPrivateKey('base64'));

    var public_key = diffHell.getPublicKey('base64');
    var private_key = diffHell.getPrivateKey('base64');

    const length = 40;
    const hash = 'SHA-256';

  return hkdf(private_key,length,{public_key,data,hash});           //fution-hkdf

  //hkdf(ikm, length, {salt, info, hash})
  //ikm = input key material
  //length = output to be expanded to length
  //salt = pseudorandom key can be public key(optional)
  //info = data to be feed(optional)
  //hash = hashing algorithm to be used
  //returns prk (pseudorandom key)
}

