const crypto = require('crypto');

function rsa_gen_key(modulus){
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: modulus
    });

    pbk = publicKey.export({
        type: "pkcs1",
        format: "pem"
    });

    pvk = privateKey.export({
        type: "pkcs1",
        format: "pem"
    });

    return { pbk, pvk };
}

function ecc_gen_key(curve) {
    const ecdh = crypto.createECDH(curve);
    ecdh.generateKeys();

    pvk = ecdh.getPrivateKey('hex');

    pbk = ecdh.getPublicKey('hex', 'uncompressed');

    return { pbk, pvk };
}

module.exports = { rsa_gen_key, ecc_gen_key };