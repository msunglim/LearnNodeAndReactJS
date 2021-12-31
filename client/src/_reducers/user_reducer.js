import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from "../_actions/types"
export default function (state={}, action){
  switch (action.type){
    case LOGIN_USER: return {
      ...state, loginSuccess:action.payload
    }

    break;
    case REGISTER_USER: return{

                //I gusss 'success' is more appropriate
      ...state, register:action.payload
    }
    case AUTH_USER:
    return{
              //action.payload has every user data
      ...state, userData:action.payload
    }
    default: return state
    break;
  }
}
