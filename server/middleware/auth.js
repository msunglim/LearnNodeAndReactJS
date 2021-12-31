const {User} = require('../modules/User')
let auth = (req,res,next) =>{
  //verification process

  //get token from client cookie.
  let token = req.cookies.x_auth


  //decode the token and then find user with the tokenExp
User.findByToken(token, (err,user)=>{
  if(err) throw err
  if(!user) return res.json({isAuth: false, error:true})

  req.token = token
  req.user = user
  next() //end midware and proceed to next function!
})

  //if user exits, verification success!

  //else verification fail!
}

module.exports = {auth}
