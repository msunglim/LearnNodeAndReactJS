import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';

function LoginPage(props){
let navigate = useNavigate();
  const dispatch = useDispatch()
  //this is state
  const [Email, setEmail] = useState('')
  const onEmailHandler = (event)=>{
    setEmail(event.currentTarget.value)
  }

  const [Password, setPassword] = useState('')
  const onPasswordHandler = (event)=>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event)=>{
    //prevent refreshing page
    event.preventDefault()

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response =>{
        if(response.payload.loginSuccess){
          console.log(response.payload)
          console.log("success:"+response.payload.success)
          console.log("register:"+response.payload.register)
            navigate('/');
        }else{  console.log("success:"+response.payload.success)
          console.log("register:"+response.payload.register)
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
        <label>Password</label>
        <input type="password" value={Password}  onChange={onPasswordHandler}/>
        <br/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
