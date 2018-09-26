const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const ownerRouter = require('./routes/owner.router');
const petRouter = require('./routes/pet.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}) );

app.use(express.static('server/public'));

app.use('/owner', ownerRouter);

app.use('/pet', petRouter);


app.listen(port, () => {
    console.log('up on port:', port);
});
