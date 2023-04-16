const crypto = require('crypto');
const { performance } = require('perf_hooks');
const sym_key_alg = require('../helpers/sym_key_alg');

function rsa_decrypt(data, pvk){
    const in_pvk = crypto.createPrivateKey({
        key: pvk
    });

    const start = performance.now();
    const decryptedData = crypto.privateDecrypt(
        {
            key: in_pvk
        },
        Buffer.from(data, "base64")
    );
    const end = performance.now();
    const dec_time = end - start;
    console.log("RSA Decryption Time: " + dec_time);

    return decryptedData.toString();
}

function ecc_decrypt(data, ssk){
    const iv = "albw+ooK8vJR8RviGSThXg==";
    const { key, alg } = sym_key_alg(ssk);

    const start = performance.now();
    let decipher = crypto.createDecipheriv(alg, key, Buffer.from(iv, "base64"));
    let decryptedData = decipher.update(data, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    const end = performance.now();
    const dec_time = end - start;
    console.log("ECC Decryption Time: " + dec_time);

    return decryptedData;
}

module.exports = { rsa_decrypt, ecc_decrypt };