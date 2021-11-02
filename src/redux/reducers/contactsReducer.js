import { GET_ALL_CONTACTS } from "../constants"

const initialState = {
    contacts: []
}
export const contactReducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
        default:
            return state
    }

}