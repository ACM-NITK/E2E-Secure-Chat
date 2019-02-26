String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

function digital_sign(username, serial_no, public_key) {

    var cert = "";
    cert = public_key + username + serial_no + "\n";
    var hash = cert.hashCode();
    var fcert = cert.concat(hash);
    //encrypt using private key
    console.log("Fcert = " + fcert);
    var q = getRandomInt(Math.pow(10, 2), Math.pow(10, 3));
    var g = getRandomInt(2, q);
    var a = generate_private_key(q);
    var h = power(g, a, q);
    
    var finalcert = encrypt(fcert, q, h, g);
    return finalcert;
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


var username = "random"; //Get username from cookie
var serial_no = randomString(8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
//var public_key = result[1];
var public_key = 12345678;
var certificate = digital_sign(username, serial_no, public_key);
console.log("Certificate created!!  " + certificate[0]);

//1.The CA public key is stored in certificate[1]
//2.the decrypt method in the elgamal.js file can be used to decrypt it
//3.Followed by passing the contents (before the newline character) 
//  through the hashing algorithm used above
//The hash(present in the string after the newline character) is then 
//compared with the contents
//If both are the same, verification is complete

/*The encrypt method used still generates random characters at times while
encrypting. Enerything else works fine */