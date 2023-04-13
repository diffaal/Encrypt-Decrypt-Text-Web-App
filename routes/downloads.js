const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/', (req, res) => {
    file_type = req.body.file_type;
    file_name = "../public/" + file_type + ".txt";
    path_file = path.join(__dirname, file_name);
    res.download(path_file);
});

module.exports = router;