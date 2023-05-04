import axios from 'axios';

const client = axios.create({
    baseURL: 'http://45.15.159.97:3001',
});

export default client;
