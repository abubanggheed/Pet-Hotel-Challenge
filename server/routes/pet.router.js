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

router.post('/', (req, res) => {
    let bdy = req.body;
    pool.query(`INSERT INTO "pet" ("name", "breed", "color", "checked_in", "last_checkin", "owner_id")
    VALUES ($1, $2, $3, true, $4, $5)`, [bdy.name, bdy.breed, bdy.color, bdy.last_checkin, bdy.owner])
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in post /pet:', error);
        res.sendStatus(500);
    });
});

router.delete('/', (req, res) => {
    pool.query(`DELETE FROM "pet"
    WHERE "id" = $1;`, [req.query.id]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in delete /pet:', error);
        res.sendStatus(500);
    });
});

module.exports = router;