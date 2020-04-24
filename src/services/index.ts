import axios from 'axios'

export const getToken = (uid: number) => {
  return axios.get('getToken', {
    params: {
      uid,
    }
  })
}

export const login = (username: string, password: string) => {
  return axios.post('loginRegister/login', {
    username, password

  })
}

export const register = (username: string, password: string) => {
  return axios.post('/loginRegister/register', {
    username, password
  })
}
