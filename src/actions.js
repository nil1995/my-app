export const changeAuth = (auth, login) => {
    const obj = {
      type: 'AUTH',
      auth,
      login,
    }
    return obj
  }