import axios from 'axios'

const authFetch = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export default authFetch