const express = require('express');

const router = express.Router();

router.get('/add', (req, res) => {
    res.send('Response From User Add Route')
})

router.get('/getall', (req, res) =>{
    res.send('Resonse From User Get All Route')
})

module.exports = router;

