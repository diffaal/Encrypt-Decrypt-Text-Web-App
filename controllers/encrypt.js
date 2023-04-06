const crypto = require('crypto');

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

    return encryptedData;
}

function ecc_encrypt(data, ssk){
    iv = crypto.randomBytes(16);
    console.log(ssk.length);
    const key = ssk.substr(0, 32);
    cipher = crypto.createCipheriv('aes256', key, iv);
    encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    console.log(encryptedData);

    return encryptedData;
}

module.exports = { rsa_encrypt, ecc_encrypt };