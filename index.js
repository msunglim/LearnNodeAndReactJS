//백엔드 시작점
//get express mododule
const express = require('express')
//make express app by using express function.
const app = express();
//can be 3000,4000,5000,,
const port = 5000;

const { User } = require('./modules/User')
const bodyParser = require('body-parser')

//body parse can analysize application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))
//body parse analysize json type
app.use(bodyParser.json())

const mongoose = require('mongoose')
const config = require('./config/key')
mongoose.connect(config.mongoURI)
    .then(() => console.log('connected to MongoDB')).catch(err => console.log(err))



//when arrive at root dir, print hello world
app.get('/', (req, res) => res.send('Hello World nodemon makes me auto compile? yeah u just need to refresh the website!'))

//end point: register callbackfunction is (req,res)=>{}
app.post('/register', (req, res) => {
    //when signing up, if we get every neccessary information from client,
    //put them into DB
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            sucess: true
        })
    })
})

app.listen(port, () =>  console.log(`Example app listening on port ${port}!`) )
