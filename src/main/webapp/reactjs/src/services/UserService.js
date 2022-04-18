import axios from 'axios';


const USERS_URL = 'http://localhost:9090/users';
const USERS_LOGIN = USERS_URL + '/login';
const USERS_IDCHECK = USERS_URL + '/idCheck';

/* 사용자 Service */
const UserService = {

    login(inputs){
        return axios.post(USERS_LOGIN, inputs);
    },
    
    idCheck(userId){
        return axios.get(USERS_IDCHECK+"/"+userId);
    }
    
}

export default UserService;