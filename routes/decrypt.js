const express = require('express');
const router = express.Router();
const { rsa_decrypt, ecc_decrypt } = require('../controllers/decrypt');
const { write_file } = require('../helpers/file');

router.post('/', (req, res) => {
    alg_type = req.body.alg_type;
    data = req.body.data;
    render = {
        cipher: null,
        plain: null
    }

    if(alg_type == 'rsa'){
        pvk = req.files.rsa_pvk.data.toString();
        plaintext = rsa_decrypt(data, pvk);
        plaintext_file_name = write_file("plaintext", plaintext);
        render.plain = plaintext;
    }
    else if(alg_type == 'ecc'){
        ssk = req.files.ecc_ssk.data.toString();
        plaintext = ecc_decrypt(data, ssk);
        plaintext_file_name = write_file("plaintext", plaintext);
        render.plain = plaintext;
    }
    res.render('../views/pages/enc-dec', render);
});

module.exports = router;
