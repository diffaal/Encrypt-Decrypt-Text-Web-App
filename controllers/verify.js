const crypto = require('crypto');
const { performance } = require('perf_hooks');

function verification(pbk, data, signature){
    const in_pbk = crypto.createPublicKey({
        key: pbk
    });

    const start = performance.now();
    const isVerified = crypto.verify("sha256", Buffer.from(data, "base64"), {
        key: in_pbk
    }, Buffer.from(signature, "base64"));
    const end = performance.now();
    const verify_time = end - start;
    console.log("Verify Time: " + verify_time);

    return isVerified;
}

module.exports = verification;