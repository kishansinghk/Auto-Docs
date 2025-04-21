const express = require('express');
const UserRouter = require('./routers/userRouter'); //importing user router

//creating new express app


const port = 5000;
const app = express();

//middleware
app.use('/user', UserRouter);

//routes or endpoints
app.get('/', (req, res) => {
    res.send('Response From Express')
})

app.get('/add', (req, res) => {
    res.send('Response From Add Route')
})

app.get('/getall', (req, res) => {
    res.send('Response From Get All Route')
})

app.listen(port, () => {
    console.log(`Server is running on Port - ${port}`)
})