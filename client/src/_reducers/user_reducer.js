import { LOGIN_USER } from '../_actions/types'

export default function (state = {}, action){
    switch (action.type) {
        case LOGIN_USER:
                return{...state, loginSucces: action.payload }     //빈상태 - 그대로 가져옴
            break;
    
        default:
            return state;
    }
}