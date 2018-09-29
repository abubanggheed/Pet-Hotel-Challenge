const express = require('express');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT "owner"."id", "owner"."name", COUNT("pet"."id") FROM "owner"
    LEFT OUTER JOIN "pet" ON "owner"."id" = "pet"."owner_id"
    GROUP BY "owner"."id", "owner"."name"
    ORDER BY "owner"."id";`).then((results) => {
        res.send(results.rows)
    }).catch( (error) => {
        console.log('error in get for /owner:', error);
        res.sendStatus(500);
    });
});

router.get('/name', (req, res) => {
    pool.query(`SELECT "owner"."id", "owner"."name", COUNT("pet"."id") FROM "owner"
    LEFT OUTER JOIN "pet" ON "owner"."id" = "pet"."owner_id"
    GROUP BY "owner"."id", "owner"."name"
    ORDER BY "owner"."name";`).then((results) => {
        res.send(results.rows)
    }).catch( (error) => {
        console.log('error in get for /owner:', error);
        res.sendStatus(500);
    });
});

router.get('/number', (req, res) => {
    pool.query(`SELECT "owner"."id", "owner"."name", COUNT("pet"."id") FROM "owner"
    LEFT OUTER JOIN "pet" ON "owner"."id" = "pet"."owner_id"
    GROUP BY "owner"."id", "owner"."name"
    ORDER BY "owner"."count" DESC;`).then((results) => {
        res.send(results.rows)
    }).catch( (error) => {
        console.log('error in get for /owner:', error);
        res.sendStatus(500);
    });
})

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

router.put('/', (req, res) => {
    pool.query(`UPDATE "owner" SET "name" = $1
    WHERE "id" = $2`, [req.query.name, req.query.id]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

module.exports = router;