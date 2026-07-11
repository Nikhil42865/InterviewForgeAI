import api from "../api/axios";

const userService = {
    async getProfile(){
        const response = await api.get('/auth/profile');
        return response.data;
    }
};

export default userService;