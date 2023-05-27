const express = require('express');
const router = express.Router();
const signing = require('../controllers/sign');
const { write_file } = require('../helpers/file');

router.post('/', (req, res) => {
    pvk = req.files.pvk.data.toString();
    data = req.body.data;

    signature = signing(pvk, data);
    signature_file_name = write_file("signature", signature);

    res.render('../views/pages/sign-ver', {
        signature: signature,
        verify: null
    });
});

module.exports = router;
