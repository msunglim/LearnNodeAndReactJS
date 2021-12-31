//�鿣�� ������
//get express mododule
const express = require('express')
//make express app by using express function.
const app = express();
//can be 3000,4000,5000,,
const port = 5000;

const { User } = require('./modules/User')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {auth} = require('./middleware/auth')
//body parse can analysize application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//body parse analysize json type
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
const config = require('./config/key')
mongoose.connect(config.mongoURI)
.then(() => console.log('connected to MongoDB')).catch(err => console.log(err))



//when arrive at root dir, print hello world
app.get('/', (req, res) => res.send('Hello World nodemon makes me auto compile? yeah u just need to refresh the website!'))

//get data from client
app.get('/api/hello',(req,res)=>{
  res.send("Hello Client!")
})



//end point: register callbackfunction is (req,res)=>{}
app.post('/api/users/register', (req, res) => {
  //when signing up, if we get every neccessary information from client,
  //put them into DB

  const user = new User(req.body)



  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res)=>{
  //find input email in db

  User.findOne({email: req.body.email}, (err, user)=>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message: "There is no user corresponding to the provided email"
      })
    }
    //if user exists..
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch){

        return res.json({loginSuccess:false, message:"Password isn't right", password:req.body.password})
      }

      //create a token
      user.generateToken((err,user)=>{
        //400 means there is an error

        if(err) return res.status(400).send(err)

        //save token at cookie (cookie, local storage etc any place is possible!)
        //we need cookie parser .npm install cookie-parser

        //x autu can be any name. it will be cookie name
        res.cookie("x_auth",user.token).status(200).json({
          loginSuccess:true,
          userId: user._id
        })
      })
    })

  })

})

app.get('/api/users/logout', auth, (req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).send({
      success:true
    })
  })
})
//get request and then before callback function, auth.
app.get('/api/users/auth', auth, (req,res)=>{

  //if reach here, it means auth is true
  res.status(200).json({
    _id: req.user._id,
    //if role 0, user. else admin
    isAdmin: req.user.role ===0? false:true,
    isAuth : true,
    email : req.user.email,
    name: req.user.name,
    lastname:req.user.lastname,
    role:req.user.role,
    image:req.user.image
  })
})

app.listen(port, () =>  console.log(`Example app listening on port ${port}!`) )
