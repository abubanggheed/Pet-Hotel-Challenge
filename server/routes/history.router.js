const express = require('express');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "history";`).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('error in get /history:', error);
        res.sendStatus(500);
    });
});

module.exports = router;