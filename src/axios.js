import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7249',
});

export default instance;