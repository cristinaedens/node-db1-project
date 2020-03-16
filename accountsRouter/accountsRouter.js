const express = require('express'); //import express
const db = require('../data/dbConfig'); //import database

const router = express.Router() //import the router from express method

router.get('/', (req, res) => {
    //get data from the DataBase
    //select * from accounts
    db.select('*').from('accounts')
        .then(rows => {
            res.status(200).json({ data: rows });
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, something went wrong retrieving the data." });
        })
})

router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(accounts => {
            if (accounts) {
                res.status(200).json({ data: accounts });
            } else {
                res.status(404).json({ message: "Account could not be found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, there was an error returning the data." });
        })
});

module.exports = router;