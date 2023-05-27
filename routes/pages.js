const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('../views/pages/index');
});

router.get('/gen-keys', function(req, res){
    res.render('../views/pages/gen-keys', {
        rsa_public_key: null,
        rsa_private_key: null,
        ecc_public_key: null,
        ecc_private_key: null,
        ssk: null
    });
});

router.get('/enc-dec', function(req, res){
    res.render('../views/pages/enc-dec', {
        cipher: null,
        plain: null
    });
});

router.get('/sign-ver', function(req, res){
    res.render('../views/pages/sign-ver', {
        signature: null,
        verify: null
    });
});

module.exports = router;