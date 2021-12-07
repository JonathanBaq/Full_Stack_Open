import axios from 'axios'

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const request = await axios.get('http://localhost:3003/api/users')
    const users = request.data
    dispatch({
      type: 'INITIALIZE_USERS',
      data: users,
    })
  }
}

export default userReducer