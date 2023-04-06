const crypto = require('crypto');
const ecKeyUtils = require('eckey-utils');

function rsa_gen_key(modulus){
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
    pbk = publicKey;
    pvk = privateKey;

    console.log(pbk);

    return { pbk, pvk };
}

function ecc_gen_key(curve) {
    const ecdh = crypto.createECDH(curve);
    ecdh.generateKeys();


    const pems = ecKeyUtils.generatePem({
        curve,
        privateKey: ecdh.getPrivateKey(),
        publicKey: ecdh.getPublicKey()
    });

    pbk = pems.publicKey;
    pvk = pems.privateKey;

    parsed = ecKeyUtils.parsePem(pbk);
    console.log(Buffer.from(parsed.publicKey).toString('hex'));

    /*
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: curve,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'sec1',
            format: 'pem'
        }
    });

    pbk = publicKey;
    pvk = privateKey;

    console.log(pbk);
    */

    console.log(pbk);

    return { pbk, pvk };
}

function ecc_gen_shared_secret_key(pvk_sender, pbk_reciever, curve) {
    const ecdh = crypto.createECDH(curve);
    ecdh.setPrivateKey(pvk_sender, 'base64');

    ssk = ecdh.computeSecret(pbk_reciever, 'base64', 'base64');

    return ssk;
}

module.exports = { rsa_gen_key, ecc_gen_key, ecc_gen_shared_secret_key };