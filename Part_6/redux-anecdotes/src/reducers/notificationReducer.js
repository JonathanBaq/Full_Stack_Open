const notificationReducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIF':
      return action.message
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIF',
    message: message
  }
}

export default notificationReducer