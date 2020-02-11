import { combineReducers } from 'redux'

import form from './formReducer'
import room from './roomReducer'
import currentUser from './currentUserReducer'
import users from './usersReducer'
import answers from './answersReducer'

export default combineReducers({
  form,
  room,
  currentUser,
  users,
  answers
})
