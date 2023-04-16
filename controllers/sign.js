const crypto = require('crypto');
const { performance } = require('perf_hooks');

function signing(pvk, data){
    const in_pvk = crypto.createPrivateKey({
        key: pvk
    });
    
    const start = performance.now();
    const signature = crypto.sign("sha256", Buffer.from(data, "base64"), {
        key: in_pvk
    });
    const end = performance.now();
    const sign_time = end - start;
    console.log("Signing Time: " + sign_time);

    return signature.toString('base64');
}

module.exports = signing;