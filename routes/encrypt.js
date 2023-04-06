const express = require('express');
const router = express.Router();
const { rsa_encrypt, ecc_encrypt } = require('../controllers/encrypt');

router.post('/', (req, res) => {
    alg_type = req.body.type;
    data = req.body.data;

    if(alg_type == 'rsa'){
        pbk = req.body.rsa_pbk;
        ciphertext = rsa_encrypt(data, pbk);

        res.json({
            cipher: ciphertext
        });
    }
    else if(alg_type == 'ecc'){
        ssk = req.body.ecc_ssk;
        ciphertext = ecc_encrypt(data, ssk);

        res.json({
            cipher: ciphertext
        });
    }
});

module.exports = router;