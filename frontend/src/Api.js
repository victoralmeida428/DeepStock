import axios from "axios"

const api = axios.create({baseURL: 'https://victor428.pythonanywhere.com/api/v1/', })

export default api
