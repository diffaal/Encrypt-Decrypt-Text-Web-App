const crypto = require('crypto');

function signing(pvk, data){
    const in_pvk = crypto.createPrivateKey({
        key: pvk
    });
    
    const signature = crypto.sign("sha256", Buffer.from(data, "base64"), {
        key: in_pvk
    });

    console.log(signature.toString("base64"));
    return signature.toString('base64');
}

module.exports = signing;