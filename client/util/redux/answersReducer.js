import callBuilder from '../apiConnection'
/**
 * Actions and reducers are in the same file for readability
 */

export const saveAnswersAction = (answers) => {
  const route = '/answers'
  const prefix = 'SAVE_ANSWERS'
  return callBuilder(route, prefix, 'post', answers)
}

// Reducer
// You can include more app wide actions such as "selected: []" into the state
export default (state = { data: null }, action) => {
  switch (action.type) {
    case 'SAVE_ANSWERS_ATTEMPT':
      return {
        ...state,
        pending: true,
        error: false
      }
    case 'SAVE_ANSWERS_SUCCESS':
      return {
        ...state,
        data: action.response,
        pending: false,
        error: false
      }
    case 'SAVE_ANSWERS_FAILURE':
      return {
        ...state,
        data: null,
        pending: false,
        error: true
      }
    default:
      return state
  }
}
