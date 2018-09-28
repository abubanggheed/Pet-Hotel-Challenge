const express = require('express');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT "history"."id", "owner"."name" AS "owner", "pet"."name" AS "pet", "check_in", "checkout" FROM "history"
    JOIN "pet" ON "history"."pet_id" = "pet"."id"
    JOIN "owner" ON "pet"."owner_id" = "owner"."id"
    ORDER BY "id" DESC;`).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('error in get /history:', error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let bdy = req.body;
    pool.query(`INSERT INTO "history" ("pet_id", "check_in")
VALUES ($1, $2);`, [bdy.id, bdy.last_checkin]).then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in post /history:', error);
            res.sendStatus(500);
        });
});

router.put('/', (req, res) => {
    pool.query(`UPDATE "history" SET "checkout" = $1
    WHERE "pet_id" = $2 AND "checkout" IS NULL;`, [req.query.date, req.query.id])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in put /history:', error);
            res.sendStatus(500);
        });
});

router.delete('/', (req, res) => {
    let id = req.query.id;
    pool.query(`DELETE FROM "history"
            WHERE "id" = $1 AND "checkout" IS NOT NULL;`, [id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in delete /history:', error);
            res.sendStatus(500);
        });
});

module.exports = router;