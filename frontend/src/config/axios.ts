import { refresh } from '@/services/authService';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if(token) config.headers['Authorization'] = token
    
    return config
})