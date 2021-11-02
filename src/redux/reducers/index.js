import {combineReducers} from 'redux'
import { AuthReducer } from './authReducer'
import { contactReducer } from './contactsReducer'

const rootReducer = combineReducers({
    contact: contactReducer,
    auth: AuthReducer
})

export default rootReducer
