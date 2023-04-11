const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const engine = require('consolidate');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use(cors({origin: '*'}));
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use('/', require('./routes/pages'));
app.use('/generate-key', require('./routes/gen_keys'));
app.use('/encrypt', require('./routes/encrypt'));
app.use('/decrypt', require('./routes/decrypt'));
app.use('/sign', require('./routes/sign'));
app.use('/verify', require('./routes/verify'));

app.listen(61666, () => {
    console.log('Program berjalan pada port 61666');
});