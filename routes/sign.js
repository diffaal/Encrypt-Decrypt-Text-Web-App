const express = require('express');
const router = express.Router();
const signing = require('../controllers/sign');

router.post('/', (req, res) => {
    pvk = req.body.pvk;
    data = req.body.data;

    signature = signing(pvk, data);

    res.json({
        signature: signature
    });
});

module.exports = router;
