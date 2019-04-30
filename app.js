const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/login');
const port = 3000
const cors = require('cors');

global.appRootDirectory = __dirname;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.use('/api', routes);
app.get('/*', function (req, res, next) {
    res.sendFile(path.join(global.appRootDirectory, 'public/index.html'));
});
app.listen(port, () => console.log(`app listening on port ${port}!`))