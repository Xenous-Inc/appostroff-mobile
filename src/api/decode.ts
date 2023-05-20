import { Buffer } from 'buffer';

export const decode = (token: string) => {
    const parts = token
        .split('.')
        .map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
    const payload = JSON.parse(parts[1]);
    console.log('JWT payload', payload);
    return payload;
};
