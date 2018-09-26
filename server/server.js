const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.listen(port, () => {
    console.log('up on port:', port);
});
