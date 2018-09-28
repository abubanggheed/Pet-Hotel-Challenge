const express = require('express');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "history"
    ORDER BY "id" DESC;`).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('error in get /history:', error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let bdy = req.body;
    pool.query(`SELECT "name" FROM "owner"
    WHERE "id" = $1`, [bdy.owner]).then((results) => {
        let own = results.rows[0].name;
        console.log(own, results);
        pool.query(`INSERT INTO "history" ("owner", "pet", "check_in", "checkout")
        VALUES ($1, $2, $3, $4)`, [own, bdy.pet, bdy.check_in, bdy.checkout]).then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in post /history:', error);
            res.sendStatus(500);
        });
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