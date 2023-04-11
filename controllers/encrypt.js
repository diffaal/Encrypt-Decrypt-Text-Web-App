const crypto = require('crypto');
const sym_key_alg = require('../helpers/sym_key_alg');

function rsa_encrypt(data, pbk){
    in_pbk = crypto.createPublicKey({
        key: pbk
    });

    const encryptedData = crypto.publicEncrypt(
        {
            key: in_pbk,
        },
        Buffer.from(data)
    );

    return encryptedData.toString("base64");
}

function ecc_encrypt(data, ssk){
    iv = "albw+ooK8vJR8RviGSThXg==";
    console.log(ssk.length);
    const { key, alg } = sym_key_alg(ssk);
    cipher = crypto.createCipheriv(alg, key, Buffer.from(iv, "base64"));
    encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    console.log(encryptedData);

    return encryptedData;
}

module.exports = { rsa_encrypt, ecc_encrypt };