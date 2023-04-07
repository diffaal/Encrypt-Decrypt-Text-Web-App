const crypto = require('crypto');

function rsa_decrypt(data, pvk){
    in_pvk = crypto.createPrivateKey({
        key: pvk
    });

    const decryptedData = crypto.privateDecrypt(
        {
            key: in_pvk
        },
        Buffer.from(data)
    );

    return decryptedData;
}

function ecc_decrypt(data, ssk){
    iv = crypto.randomBytes(16);
    console.log(ssk.length);
    const key = ssk.substr(0, 32);
    decipher = crypto.createDecipheriv('aes256', key, iv);
    decryptedData = decipher.update(data, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    console.log(decrypted);

    return decryptedData;
}

module.exports = { rsa_decrypt, ecc_decrypt };