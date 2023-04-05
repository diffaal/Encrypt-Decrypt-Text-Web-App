/** 
    const {publicKey, privateKey} = crypto.generateKeyPairSync(alg_type, options);
    
    out_pvk = privateKey.export({
        type: exp_type,
        format: "pem"
    });

    out_pbk = publicKey.export({
        type: "spki",
        format: "pem"
    });

    in_pvk = crypto.createPrivateKey({
        key: out_pvk
    });

    in_pbk = crypto.createPublicKey({
        key: out_pbk
    });
    **/

    /**
    const ecdh_a = createECDH('secp256k1');
    ecdh_a.generateKeys();
    const ecdh_pbk = ecdh.getPublicKey('hex', 'compressed');

    const data = "my secret data";

    const encrypt_msg = eccrypto.encrypt(ecdh_pbk, Buffer.from(data));
    console.log(encrypt_msg);
    **/
    const ecdh_a = createECDH('secp256k1');
    ecdh_a.generateKeys();

    const ecdh_b = createECDH('secp256k1');
    ecdh_b.generateKeys();

    const ecdh_pbk = ecdh_a.getPublicKey('hex', 'compressed');
    console.log(ecdh_pbk);

    a_secret = ecdh_a.computeSecret(ecdh_b.getPublicKey(), null, 'hex');

    console.log(a_secret);

    const data = "my secret data";
    var iv = crypto.randomBytes(16);
    const secret = 'shezhuansauce';
    const key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
    cipher = crypto.createCipheriv('aes256', key, iv,);
    var encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);

    var decipher = crypto.createDecipheriv('aes256', key, iv);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);