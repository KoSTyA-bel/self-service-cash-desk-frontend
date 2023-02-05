import { autoBatchEnhancer } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'https://localhost:7249',
})

instance.interceptors.response.use((config) => {
    return config;
}, (error) => {
    if (error.response.status === 500) {
        window.location.href = "/error"
    }

    return error
})

export default instance;