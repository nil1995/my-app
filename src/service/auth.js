import rest from './rest';

export const register = async (data) => rest.post('./auth/register', data);

export const login = async (data) => rest.post('./auth/login', data);