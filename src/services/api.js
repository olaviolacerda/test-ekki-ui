import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ekki-api-olavio.herokuapp.com/api'
})

export default api;