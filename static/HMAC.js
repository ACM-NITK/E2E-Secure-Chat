function HMAC(ck) {

    //include this when using
    /*<script src="node_modules/tweetnacl-util/nacl-util.js"></script>
    <script src="node_modules/tweetnacl-util/nacl-util.min.js"></script>
    <script src="node_modules/fast-sha256/sha256.js"></script>*/

    //var ck = '1234567890abcdef1234567890abcdef';
    ck = nacl.util.decodeUTF8(ck);

    var msg_key_const = nacl.util.decodeUTF8('1');
    var chain_key_const = nacl.util.decodeUTF8('2');

    var next_chain_key_arr = sha256.hmac(ck, chain_key_const);
    var next_msg_key_arr =sha256.hmac(ck, msg_key_const);

    var next_msg_key = arrayToStr(next_msg_key_arr);
    var next_chain_key =arrayToStr(next_chain_key_arr);

    //console.log(next_chain_key);
    //console.log(next_msg_key);

    arr=[next_chain_key,next_msg_key];
    //console.log(arr);
    return arr;
}
function arrayToStr(array){
    result=''
    for(i=0;i<32;i++){
        result+=String.fromCharCode(array[i]%128);
    }
    return result;
}

