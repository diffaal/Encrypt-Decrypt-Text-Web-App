const crypto = require('crypto');
const { performance } = require('perf_hooks');
const sym_key_alg = require('../helpers/sym_key_alg');

function rsa_encrypt(data, pbk){
    const in_pbk = crypto.createPublicKey({
        key: pbk
    });

    const start = performance.now();
    const encryptedData = crypto.publicEncrypt(
        {
            key: in_pbk,
        },
        Buffer.from(data)
    );
    const end = performance.now();
    const enc_time = end - start;
    console.log("RSA Encryption Time: " + enc_time);

    return encryptedData.toString("base64");
}

function ecc_encrypt(data, ssk){
    const iv = "albw+ooK8vJR8RviGSThXg==";
    const { key, alg } = sym_key_alg(ssk);

    const start = performance.now();
    let cipher = crypto.createCipheriv(alg, key, Buffer.from(iv, "base64"));
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    const end = performance.now();
    const enc_time = end - start;
    console.log("ECC Encryption Time: " + enc_time);

    return encryptedData;
}

module.exports = { rsa_encrypt, ecc_encrypt };