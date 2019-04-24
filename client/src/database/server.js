import axios from 'axios'

var axi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'token': localStorage.getItem('token')}
})

export default axi