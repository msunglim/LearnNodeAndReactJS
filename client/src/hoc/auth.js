import React, {useEffect} from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'
 import { useNavigate } from 'react-router-dom';

export default function(SpecificComponent, option, adminRoute = null){

  //if null: anyone can visit, if true: only login user can visit, if false: login user can't visit

  function AuthenticationCheck(props){
    let navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
      // Axios.get('/api/users/auth')
      dispatch(auth()).then(response =>{
        console.log(response)
        //if login is false = isAuth = false
        if(!response.payload.isAuth){
          //if option true, it means only login user can visit
          //since user isn't loginned, move him to login page
          if(option){
            navigate('/login')
          }
        }else{
          //if login is true
          //try to visit admin only page but if he isnt admin
          if(adminRoute && !response.payload.isAdmin){
              navigate('/')
          }else{
            //if login and try to visit unlogin user only page
            if(option===false){
              navigate('/')
            }
          }

        }
      })

    }, [])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck

}
