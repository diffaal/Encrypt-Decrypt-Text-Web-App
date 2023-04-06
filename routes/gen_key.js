const express = require('express');
const router = express.Router();
const { rsa_gen_key, ecc_gen_key, ecc_gen_shared_secret_key } = require('../controllers/gen_key');

router.get('/', (req, res) => {
    alg_type = req.body.type;
    
    if(alg_type == 'rsa'){
        modulusLength =  req.body.mod;
        const { pbk, pvk } = rsa_gen_key(modulusLength);

        res.json({
            public_key: pbk,
            private_key: pvk
        });
        
    }
    else if(alg_type == 'ecc'){
        namedCurve = req.body.curve;
        const { pbk, pvk } = ecc_gen_key(namedCurve);

        res.json({
            public_key: pbk,
            private_key: pvk
        });
    }
    
});

router.get('/shared-secret-key', (req, res) => {
    pvk_sender = req.body.pvk_sender;
    pbk_reciever = req.body.pbk_reciever;
    namedCurve = req.body.curve;

    ssk = ecc_gen_shared_secret_key(pvk_sender, pbk_reciever, namedCurve);

    res.json({
        shared_secret_key: ssk
    });
});

module.exports = router;