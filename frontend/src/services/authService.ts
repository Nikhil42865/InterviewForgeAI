import api from '../api/axios'
import type {LoginData} from '../types/auth';
const authService = {
    // all the method will be defined here
    async login (data: LoginData){
        const response = await api.post('/auth/login', data);
        return response.data;
    }
};

export default authService;