const crypto = require('crypto');

function verification(pbk, data, signature){
    const in_pbk = crypto.createPublicKey({
        key: pbk
    });

    const isVerified = crypto.verify("sha256", Buffer.from(data, "base64"), {
        key: in_pbk
    }, Buffer.from(signature, "base64"));

    console.log(isVerified);
    return isVerified;
}

module.exports = verification;