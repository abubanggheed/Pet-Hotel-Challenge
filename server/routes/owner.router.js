const express = require('express');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT "owner"."name", COUNT("pet"."id") FROM "owner"
    JOIN "pet" ON "owner"."id" = "pet"."owner_id"
    GROUP BY "owner"."name";`).then((results) => {
        res.send(results.rows)
    }).catch( (error) => {
        console.log('error in get for /owner:', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;