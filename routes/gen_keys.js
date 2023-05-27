const express = require('express');
const router = express.Router();
const { rsa_gen_key, ecc_gen_key, ecc_gen_shared_secret_key } = require('../controllers/gen_keys');
const { write_file } = require('../helpers/file');

router.post('/', (req, res) => {
    alg_type = req.body.alg_type;
    render = {
        rsa_public_key: null,
        rsa_private_key: null,
        ecc_public_key: null,
        ecc_private_key: null,
        ssk: null
    }

    if(alg_type == 'rsa'){
        modulusLength =  parseInt(req.body.mod);
        const { pbk, pvk } = rsa_gen_key(modulusLength);

        pbk_file_name = write_file("rsa_public_key", pbk);
        render.rsa_public_key = pbk;

        pvk_file_name = write_file("rsa_private_key", pvk);
        render.rsa_private_key = pvk;
    }
    else if(alg_type == 'ecc'){
        namedCurve = req.body.curve;
        const { pbk, pvk } = ecc_gen_key(namedCurve);

        pbk_file_name = write_file("ecc_public_key", pbk);
        render.ecc_public_key = pbk;

        pvk_file_name = write_file("ecc_private_key", pvk);
        render.ecc_private_key = pvk; 
    }
    res.render('../views/pages/gen-keys', render);
});

router.post('/shared-secret-key', (req, res) => {
    render = {
        rsa_public_key: null,
        rsa_private_key: null,
        ecc_public_key: null,
        ecc_private_key: null,
        ssk: null
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    pvk_sender = req.files.pvk_sender.data.toString();
    pbk_reciever = req.files.pbk_reciever.data.toString();

    ssk = ecc_gen_shared_secret_key(pvk_sender, pbk_reciever);
    ssk_file_name = write_file("shared-secret-key", ssk);
    render.ssk = ssk;

    res.render('../views/pages/gen-keys', render);
});

module.exports = router;