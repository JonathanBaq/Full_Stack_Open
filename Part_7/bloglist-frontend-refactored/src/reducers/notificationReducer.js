const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return action.message
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  window.clearTimeout(window.timeout)

  const object = {
    type: 'SET_NOTIF',
    message: message
  }
  return async dispatch => {
    await dispatch(object)

    window.timeout = setTimeout(() => {
      dispatch({
        ...object,
        message: null
      })
    }, timeout * 1000)
  }
}

export default notificationReducer