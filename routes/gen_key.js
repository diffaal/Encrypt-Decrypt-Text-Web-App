const express = require('express');
const router = express.Router();
const { rsa_gen_key, ecc_gen_key } = require('../controllers/gen_key');

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
    else if(alg_type == 'ec'){
        namedCurve = req.body.curve;
        const { pbk, pvk } = ecc_gen_key(namedCurve);

        res.json({
            public_key: pbk,
            private_key: pvk
        });
    }
    
});

module.exports = router;