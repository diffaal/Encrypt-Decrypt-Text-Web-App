const express = require('express');
const router = express.Router();
const verification = require('../controllers/verify');

router.post('/', (req, res) => {
    pbk = req.files.pbk.data.toString();
    data = req.body.data;
    signature = req.files.signature.data.toString();

    verify = verification(pbk, data, signature);

    res.render('../views/sign-ver', {
        signature: null,
        verify: verify
    });
});

module.exports = router;