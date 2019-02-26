//include script sjcl.js along with this when using

function encryptMessage(enckey, plaintext){
    var ciphertext = sjcl.encrypt(enckey, plaintext, {mode : "gcm"});

    //console.log("Generated ciphertext = " + ciphertext);

    return ciphertext;
}

function decryptMessage(enckey, ciphertext){

    var plaintext = sjcl.decrypt(enckey, ciphertext);

    //console.log("Decrypted text = " + plaintext);

    return plaintext;

}
