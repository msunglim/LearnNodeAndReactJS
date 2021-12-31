import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
function RegisterPage(props){
  let navigate = useNavigate();
  const dispatch = useDispatch()
  //this is state
  const [Email, setEmail] = useState('')
  const onEmailHandler = (event)=>{
    setEmail(event.currentTarget.value)
  }
  const [Name, setName] = useState('')
  const onNameHandler = (event)=>{
    setName(event.currentTarget.value)
  }
  const [Password, setPassword] = useState('')
  const onPasswordHandler = (event)=>{
    setPassword(event.currentTarget.value)
  }
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const onConfirmPasswordHandler = (event)=>{
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event)=>{
    //prevent refreshing page
    event.preventDefault()
    if(Password !== ConfirmPassword){
      return alert("Password must be eqaul to ConfirmPassword!")
    }
    let body = {
      email: Email,
      name:Name,
      password: Password
    }

    dispatch(registerUser(body))
    .then(response=>{
      if(response.payload.success){
      //  console.log(response.payload)
        // console.log("success:"+response.payload.success)
        // console.log("register:"+response.payload.register)
        // console.log("register successful!")
        navigate('/login')
      }else{
        // console.log("failed")
        // console.log(response.payload)
        // console.log("success:"+response.payload.success)
        // console.log("register:"+response.payload.register)
        alert("Error!")
      }
    })

  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%',height:'100vh'}}>
    <form style={{display:'flex', flexDirection:'column'}}
    onSubmit = {onSubmitHandler}
    >
    <label>Email</label>
    <input type="email" value={Email} onChange={onEmailHandler}/>
    <label>Name</label>
    <input type="text" value={Name} onChange={onNameHandler}/>

    <label>Password</label>
    <input type="password" value={Password}  onChange={onPasswordHandler}/>
    <label>Confirm Password</label>
    <input type="password" value={ConfirmPassword}  onChange={onConfirmPasswordHandler}/>

    <br/>
    <button type="submit">
    Sign in
    </button>
    </form>
    </div>
  )
}

export default RegisterPage
