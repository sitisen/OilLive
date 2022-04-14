import axios from 'axios';


const USERS_URL = 'http://localhost:9090/users';
const USERS_LOGIN = USERS_URL + '/login';

/* 사용자 Service */
const UserService = {

    login(inputs){
        return axios.post(USERS_LOGIN, inputs);
    }
    
    
}

export default UserService;