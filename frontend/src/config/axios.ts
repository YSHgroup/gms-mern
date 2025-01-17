import { logout, refresh } from '@/services/authService';
import { navigateTo } from '@/utils/globalNavigator';
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

axios.interceptors.response.use((response) => {
    if(response.status == 401) logout(navigateTo)
    return response
}, (error) => {
    return Promise.reject(error)
})