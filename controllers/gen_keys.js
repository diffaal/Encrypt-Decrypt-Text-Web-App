const crypto = require('crypto');
const { performance } = require('perf_hooks');
const ecKeyUtils = require('eckey-utils');

function rsa_gen_key(modulus){
    const start = performance.now();
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: modulus,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    const end = performance.now();
    const rsa_gen_key_time = end - start;
    console.log("RSA Gen Key Time: " + rsa_gen_key_time);

    const pbk = publicKey;
    const pvk = privateKey;

    return { pbk, pvk };
}

function ecc_gen_key(curve) {
    const ecdh = crypto.createECDH(curve);

    const start = performance.now();
    ecdh.generateKeys();
    const end = performance.now();
    const ecc_gen_key_time = end - start;
    console.log("ECC Gen Key Time: " + ecc_gen_key_time);

    const pems = ecKeyUtils.generatePem({
        curve,
        privateKey: ecdh.getPrivateKey(),
        publicKey: ecdh.getPublicKey()
    });

    const pbk = pems.publicKey;
    const pvk = pems.privateKey;

    return { pbk, pvk };
}

function ecc_gen_shared_secret_key(pvk_sender, pbk_reciever) {
    const sender_parsed = ecKeyUtils.parsePem(pvk_sender);
    const reciever_parsed = ecKeyUtils.parsePem(pbk_reciever);
    
    const curve = sender_parsed.curveName;

    const ecdh = crypto.createECDH(curve);

    ecdh.setPrivateKey(sender_parsed.privateKey, 'base64');

    const start = performance.now();
    const ssk = ecdh.computeSecret(reciever_parsed.publicKey, 'base64', 'base64');
    const end = performance.now();
    const ecc_gen_ssk_time = end - start;
    console.log("ECC Gen SSK Time: " + ecc_gen_ssk_time);

    return ssk;
}

module.exports = { rsa_gen_key, ecc_gen_key, ecc_gen_shared_secret_key };