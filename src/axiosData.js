import axios from 'axios'

const axiosData = axios.create({
    baseURL: process.env.REACT_APP_DATABASE
})

export default axiosData