const express = require('express');
const Model = require('../models/userModel'); //importing user model
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            // Generate JWT token with user's name and email after signup
            const { _id, name, email } = result;
            const payload = { _id, name, email };
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error generating token' });
                } else {
                    res.status(200).json({ token });
                }
            });
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({ message: 'contact email already exists' });
            }
            else {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
})



router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});





router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                const { _id, name, email } = result;
                const payload = { _id, name, email };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: 'invalid credentials' });
                    } else {
                        res.status(200).json({ token });
                    }
                })
            }
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
});


router.post('/', (req, res) => {
    const { name, email, message } = req.body;


    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    console.log('Contact message received:', { name, email, message });

    res.status(200).json({ message: 'Thank you for contacting us!' });
});


module.exports = router;

