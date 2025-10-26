import axios from 'axios'

// set base url
export const API = axios.create({
    baseURL:'https://dummyjson.com/auth'
})