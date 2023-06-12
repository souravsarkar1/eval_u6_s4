const express = require('express');
const cors = require('cors')
const { connectiion } = require('./db');
const { userRouter } = require('./roter/user.router');
const { noteRouter } = require('./roter/notes.route');
require('dotenv').config()
const app = express();
app.use(cors())

app.use(express.json());
app.use('/posts' , noteRouter)
app.use('/users',userRouter);







app.listen(process.env.port, async () => {
    try {
        await connectiion;
        console.log("connectd to db");
        console.log("server is running on port no 4500");

    } catch (error) {
        console.log("Something Went To wrong");
        console.log(err.message);
    }
})