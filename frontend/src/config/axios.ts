import { refresh } from '@/services/authService';
import { isTokenExpired } from '@/utils/token';
import axios, { InternalAxiosRequestConfig } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if(token) config.headers['Authorization'] = token
    if(!token || (token && isTokenExpired(token))) {
        // refresh()
    } 
    return config
})
