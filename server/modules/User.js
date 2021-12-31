const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')
const saltRounds =  10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({

  name: {
    type: String,
    maxlength: 50

  },
  email: {
    type: String,
    trim: true,
    unique:1

  },
  password: {
    type: String,
    minlength:5
  },
  lastname: {
    type: String,
    maxlength:50
  },
  role: {
    type: Number,
    default:0
  },
  image: String,
  token: {
    type: String

  },
  tokenExp: {
    type: Number
  }

})

userSchema.pre('save', function(next){

  var user = this;
  if(user.isModified('password')){

    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err) return next(err)
      bcrypt.hash(user.password, salt, function(err,hash){
        if(err) return next(err)
        user.password = hash
        next()
      })
    })

  }else{
    next()
  }
})
//cb is callbackfunction
userSchema.methods.comparePassword = function(plainPassword, cb){
  bcrypt.compare(plainPassword, this.password, function(err,isMatch){
    var user = this

    if(err) {
      //if some unexpected err (which isn't unmatching!!! return that error)

      return cb(err)
    }else{
      //return if it is matched or unmatched
      cb(null, isMatch)
    }
  } )
}

userSchema.methods.generateToken = function(cb){
  var user = this
  //using jsonwebtoken, create a token. the second paramater(secretToken) can be anything.
  //user._id + secretToken = token
  var token = jwt.sign(user._id.toHexString(), 'secretToken')
  user.token = token
  user.save(function(err, user){
    //if error exist return callbackfunction with err else with user information
    if(err) return cb(err)
    cb(null, user)
  })

}

userSchema.statics.findByToken = function(token, cb){
  var user =this

  //user._id+'' = token
  //decode token
  jwt.verify(token, 'secretToken', function(err,decoded){
    //with user id, find users//and chekc whether the token from client is the same token in DB or not

    user.findOne({"_id":decoded, "token":token}, function(err, user){
      if(err) return cb(err)
      cb(null,user)
    })

  })

}


const User = mongoose.model('User', userSchema)

module.exports = { User }
