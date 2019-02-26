const forge = require('node-forge');
const blueimp_md5 = require('blueimp-md5');

function gcd_two_numbers(x, y){
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;

  x = Math.abs(x);
  y = Math.abs(y);

  while(y){
    var t = y;
    y = x % y;
    x = t;
  }

  return x;
}

function sha(m){
	var encry = blueimp_md5.md5(m);
	return parseInt(encry, 16);
}


function sign_generator(m){
	var keyPair = forge.pki.rsa.generateKeyPair(4096);
	var p = keyPair.privateKey.p;

	var x = Math.floor(Math.random() * (p - 4)) + 2 ;
	var g = Math.floor(Math.random() * (p - 1)) + 2 ;
	var y = Math.pow(g, x) % p;
	var k = Math.floor(Math.random() * (p - 4)) + 2 ;

	while(gcd_two_numbers(k,p-1)!=1){
		k = Math.floor(Math.random() * (p - 4)) + 2 ;
	}

	var r = Math.pow(g,k) % p;
	var s = ((sha(m) - (x * r))/k) % (p - 1);

	while(s == 0){
	
		var keyPair = forge.pki.rsa.generateKeyPair(4096);
		var p = keyPair.privateKey.p;

		var x = Math.floor(Math.random() * (p - 4)) + 2 ;
		var g = Math.floor(Math.random() * (p - 1)) + 2 ;
		var y = Math.pow(g,x) % p;
		var k = Math.floor(Math.random() * (p - 4)) + 2 ;

		while(gcd_two_numbers(k,p-1)==1){
			k = Math.floor(Math.random() * (p - 4)) + 2 ;
		}

		var r = pow(g,k) % p;
		var s = ((sha(m) - (x * r))/k) % (p - 1);
	}

	return (r,s,p,y,g,sha(m));
}

function sign_verify(r,s,p,y,g,h_m){
	if( r > 0 && r < p && s > 0 && s < p - 1){
		if(Math.pow(g, h_m) % p == (Math.pow(y, r)*pow(r, s)) % p)
			return "Verified";
	}
	return "Not Verified";
}

