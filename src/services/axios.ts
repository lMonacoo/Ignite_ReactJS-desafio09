import axios from 'axios'

export const api = axios.create({
    baseURL: '/api' // poderiamos passar toda a URL, porém o axios vai reaproveitar a rota da aplicação então podemos passar apenas a rota que muda do front para o back
})