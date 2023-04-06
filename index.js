const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use(cors({origin: '*'}));
app.set('view engine', 'html');

app.use('/', require('./routes/home'));
app.use('/generate-key', require('./routes/gen_key'));
app.use('/encrypt', require('./routes/encrypt'));

app.listen(61666, () => {
    console.log('Program berjalan pada port 61666');
});