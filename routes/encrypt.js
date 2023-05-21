const express = require('express');
const router = express.Router();
const { rsa_encrypt, ecc_encrypt } = require('../controllers/encrypt');
const { write_file } = require('../helpers/file');

router.post('/', (req, res) => {
    alg_type = req.body.alg_type;
    data = req.body.data;
    render = {
        cipher: null,
        plain: null
    }

    if(alg_type == 'rsa'){
        pbk = req.files.rsa_pbk.data.toString();
        ciphertext = rsa_encrypt(data, pbk);
        ciphertext_file_name = write_file("ciphertext", ciphertext);
        render.cipher = ciphertext;
    }
    else if(alg_type == 'ecc'){
        ssk = req.files.ecc_ssk.data.toString();
        ciphertext = ecc_encrypt(data, ssk);
        ciphertext_file_name = write_file("ciphertext", ciphertext);
        render.cipher = ciphertext;
    }
    res.render('../views/enc-dec', render);
});

module.exports = router;