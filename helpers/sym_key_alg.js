function sym_key_alg(ssk){
    ssk_length = ssk.length;
    key = null;
    alg = null;

    if(ssk_length > 28){
        key = ssk.substr(0, 32);
        alg = "aes256";
    }
    else{
        key =ssk.substr(0, 24);
        alg = "aes192";
    }

    return { key, alg };
}

module.exports = sym_key_alg;