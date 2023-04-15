const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('../views/index');
});

router.get('/gen-keys', function(req, res){
    res.render('../views/gen-keys', {
        rsa_public_key: null,
        rsa_private_key: null,
        ecc_public_key: null,
        ecc_private_key: null,
        ssk: null
    });
});

router.get('/enc-dec', function(req, res){
    res.render('../views/enc-dec', {
        cipher: null,
        plain: null
    });
});

router.get('/sign-ver', function(req, res){
    res.render('../views/sign-ver');
});

module.exports = router;