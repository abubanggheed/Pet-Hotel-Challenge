const express = require('express');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT "owner"."id", "owner"."name", COUNT("pet"."id") FROM "owner"
    FULL OUTER JOIN "pet" ON "owner"."id" = "pet"."owner_id"
    GROUP BY "owner"."id", "owner"."name";`).then((results) => {
        res.send(results.rows)
    }).catch( (error) => {
        console.log('error in get for /owner:', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    pool.query(`INSERT INTO "owner" ("name")
    VALUES ($1)`, [req.body.name]).then((results) => {
        res.sendStatus(201);
    }).catch( (error) => {
        console.log('error in post for /owner:', error);
        res.sendStatus(500);
    });
});

router.delete('/', (req, res) => {
    pool.query(`DELETE FROM "owner"
    WHERE "id" = $1;`, [req.query.id]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

module.exports = router;