//백엔드 시작점
//get express mododule
const express = require('express')
//make express app by using express function.
const app = express();
//can be 3000,4000,5000,,
const port = 5000;

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Moungsung:msung1@msunglim.qgxrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('connected to MongoDB')).catch(err => console.log(err))



//when arrive at root dir, print hello world
app.get('/', (req, res) => res.send('Hello World'))

//start at 5000.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))