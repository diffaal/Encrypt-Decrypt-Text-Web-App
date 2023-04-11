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
    console.log(parsed);

    return { pbk, pvk };
}

function ecc_gen_shared_secret_key(pvk_sender, pbk_reciever) {
    sender_parsed = ecKeyUtils.parsePem(pvk_sender);
    reciever_parsed = ecKeyUtils.parsePem(pbk_reciever);
    
    curve = sender_parsed.curveName;

    const ecdh = crypto.createECDH(curve);

    ecdh.setPrivateKey(sender_parsed.privateKey, 'base64');

    ssk = ecdh.computeSecret(reciever_parsed.publicKey, 'base64', 'base64');

    return ssk;
}

module.exports = { rsa_gen_key, ecc_gen_key, ecc_gen_shared_secret_key };