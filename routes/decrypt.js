const express = require('express');
const router = express.Router();
const { rsa_decrypt, ecc_decrypt } = require('../controllers/decrypt');

router.post('/', (req, res) => {
    alg_type = req.body.type;
    data = req.body.data;

    if(alg_type == 'rsa'){
        pvk = req.body.rsa_pvk;
        plaintext = rsa_decrypt(data, pvk);

        res.json({
            text: plaintext
        });
    }
    else if(alg_type == 'ecc'){
        ssk = req.body.ecc_ssk;
        plaintext = ecc_decrypt(data, ssk);

        res.json({
            text: plaintext
        });
    }
});

module.exports = router;
