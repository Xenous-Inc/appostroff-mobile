import axios from 'axios';

const client = axios.create({
    baseURL: 'http://176.124.199.69:3001',
});

export default client;
