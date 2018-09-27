const express = require('express');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT "pet"."owner_id", "owner"."name" AS "owner_name", "pet"."name", "pet"."id", "breed", "color", "checked_in", "last_checkin" FROM "owner"
    RIGHT OUTER JOIN "pet" ON "owner"."id" = "pet"."owner_id";`).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

module.exports = router;