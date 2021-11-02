import { SET_AUTH_STATE,SET_USER } from "../constants"

const initialState = {
    isAuthenticated: false,
    currentUser: '',
    userEmail: ''
}
export const AuthReducer = (state=initialState,action)=>{
    switch(action.type){
        case SET_AUTH_STATE:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case SET_USER:
            return {
                ...state,
                currentUser: action.name,
                userEmail:action.email
            }
        default:
            return state
    }

}