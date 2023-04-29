import axios from 'axios';

const client = axios.create({
    baseURL: 'https://some-domain.com/api/',
});

export default client;
