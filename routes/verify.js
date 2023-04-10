const express = require('express');
const router = express.Router();
const verification = require('../controllers/verify');

router.post('/', (req, res) => {
    pbk = req.body.pbk;
    data = req.body.data;
    signature = req.body.signature;

    verify = verification(pbk, data, signature);

    res.json({
        verify: verify
    });
});

module.exports = router;