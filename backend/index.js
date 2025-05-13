const express = require('express');
const UserRouter = require('./routers/userRouter'); //importing user router
const docsRouter = require('./routers/docsRouter'); //importing docs router



//creating new express app
const cors = require('cors');


const port = 5000;
const app = express();

app.use(cors({
    origin: '*'
}));

// Middleware to parse JSON request bodies
app.use(express.json());

//middleware
app.use('/user', UserRouter);
app.use('/api', docsRouter);



app.listen(port, () => {
    console.log(`Server is running on Port - ${port}`)
})