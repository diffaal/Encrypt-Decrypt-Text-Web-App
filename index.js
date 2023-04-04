const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.set('view engine', 'html');

app.use(require('./routes/home'));

app.listen(61666, () => {
    console.log('Program berjalan pada port 61666');
});