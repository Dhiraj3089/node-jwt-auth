const express = require('express');
const app = express();
const expressProxy = require('express-http-proxy');
const port = 3001
const cors = require('cors');
const proxyUrl = "http://localhost:3000"
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/proxy', expressProxy(proxyUrl, {
    preserveHostHdr: true
}));
app.listen(port, () => console.log(`app listening on port ${port}!`))