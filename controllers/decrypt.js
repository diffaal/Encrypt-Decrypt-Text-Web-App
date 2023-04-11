const crypto = require('crypto');
const sym_key_alg = require('../helpers/sym_key_alg');

function rsa_decrypt(data, pvk){
    in_pvk = crypto.createPrivateKey({
        key: pvk
    });

    const decryptedData = crypto.privateDecrypt(
        {
            key: in_pvk
        },
        Buffer.from(data, "base64")
    );

    return decryptedData.toString();
}

function ecc_decrypt(data, ssk){
    iv = "albw+ooK8vJR8RviGSThXg==";
    console.log(ssk.length);
    const { key, alg } = sym_key_alg(ssk);
    decipher = crypto.createDecipheriv(alg, key, Buffer.from(iv, "base64"));
    decryptedData = decipher.update(data, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    console.log(decryptedData);

    return decryptedData;
}

module.exports = { rsa_decrypt, ecc_decrypt };