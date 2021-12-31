import axios from 'axios'
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from './types'

export function loginUser(dataTosubmit){

  const request = axios.post('/api/users/login', dataTosubmit)
  .then(response=>response.data
  )

  //give this data to reducer.
  return {
    type: LOGIN_USER,
    payload: request
  }
}
export function registerUser(dataTosubmit){

  const request = axios.post('/api/users/register', dataTosubmit)
  .then(response=>response.data
  )

  //give this data to reducer.
  return {
    type: REGISTER_USER,
    payload: request
  }
}

//get doesn't need dataTosubmit
export function auth(){
  
  const request = axios.get('/api/users/auth')
  .then(response=>response.data
  )

  //give this data to reducer.
  return {
    type: AUTH_USER,
    payload: request
  }
}
