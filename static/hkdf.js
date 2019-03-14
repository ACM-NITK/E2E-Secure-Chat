/* //const hkdf = require('futoin-hkdf');
//var crypto = require('crypto');

function hkey_derivation_function(data,dh_out){

	//data is chain key
    var prime_length = 32;
    //var diffHell = crypto.createDiffieHellman(prime_length);

    //diffHell.generateKeys('base64');

//console.log(diffHell.generateKeys('base64'));
//console.log("Public Key : " ,diffHell.getPublicKey('base64'));
//console.log("Private Key : " ,diffHell.getPrivateKey('base64'));

    //var public_key = diffHell.getPublicKey('base64');
    //var private_key = diffHell.getPrivateKey('base64');
	 var next_chain_info = nacl.util.decodeUTF8('1');
    var recieve_chain_info = nacl.util.decodeUTF8('2');

    const length = 40;
    const hash = 'SHA-256';
  var next_chain_key = hkdf(private_key,length,{public_key,data,hash});
	var recieving_chain_key = hkdf(private_key,length,{public_key,dh_out,hash});
	arr = [next_chain_key,recieving_chain_key]
	
	var next_chain_key =hkdf(dh_out,length,{data,next_chain_info,hash});
	var recieving_chain_key = hkdf(dh_out,length,{data,recieve_chain_info,hash});
	
	arr = [next_chain_key,recieving_chain_key] 
	
	return arr//fution-hkdf

  //hkdf(ikm, length, {salt, info, hash})
  //ikm = input key material
  //length = output to be expanded to length
  //salt = pseudorandom key can be public key(optional)
  //info = data to be feed(optional)
  //hash = hashing algorithm to be used
  //returns prk (pseudorandom key)
	
} */

function hkdfx(oldRK, dhout) {
  var next_root_key = nacl.util.decodeUTF8('heyyosuckaabcdef1234567890abcdef');
  var next_chain_key = nacl.util.decodeUTF8('1234567890abcdef1234567890abcdef');
  return [next_root_key,next_chain_key]
}