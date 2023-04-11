const express = require('express');
const router = express.Router();

router.get('/home', function(req, res){
    res.render('../views/index.html');
});

router.get('/gen-keys', function(req, res){
    res.render('../views/gen-keys');
});

router.get('/enc-dec', function(req, res){
    res.render('../views/enc-dec');
});

router.get('/sign-ver', function(req, res){
    res.render('../views/sign-ver');
});

module.exports = router;