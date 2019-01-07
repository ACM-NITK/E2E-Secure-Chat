function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gcd(a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}
function generate_private_key(q) {
    key = getRandomInt(Math.pow(10, 2), q);
    while (gcd(q, key) != 1)
        key = getRandomInt(Math.pow(10, 2), q)

    return key;
}

function power(x, y, p) {
    var res = 1;

    x = x % p;

    while (y > 0) {
        if (y & 1)
            res = (res * x) % p;
        y = y >> 1;
        x = (x * x) % p;
    }
    return res;
}

max = 126;
min = 32;
function encrypt(msg, q, h, g) {

    // en_msg = []
    var en_msg = msg;
    var en2_msg = "";
    k = generate_private_key(q)
    s = power(h, k, q)
    p = power(g, k, q)
    console.log("s is " + s);
    console.log("p is " + p);
    console.log("k is " + k);
    // for (i = 0; i < msg.length; i++)
    //     en_msg.push(msg[i])
    console.log(en_msg);
    console.log("g^k used : " + p);
    console.log("g^ak used : " + s);
    // console.log(en_msg.length);
    for (i = 0; i < en_msg.length; i++) {
        // console.log(String.fromCharCode(s*en_msg.charCodeAt(i)));
        // en_msg[i] = String.fromCharCode(s*en_msg.charCodeAt(i));
        en2_msg += String.fromCharCode((s * (en_msg.charCodeAt(i))) % 128);
        // console.log(en2_msg[i]);
        // console.log(en_msg.charCodeAt(i));
    }
    console.log(en2_msg);
    return [en2_msg, p];
}
// max = Math.pow(10,50);
// min = Math.pow(10,2);
//GENERATE PRIME q
var msg = "blah";
var q = getRandomInt(Math.pow(10, 2), Math.pow(10, 10));
var g = getRandomInt(2, q);
var a = generate_private_key(q);
var h = power(g, a, q);

console.log('Private key(not published!!!) is ' + a);
console.log('g is ' + g);
console.log('g^a is ' + h);

var result = encrypt(msg, q, h, g);
console.log(result[0]);
