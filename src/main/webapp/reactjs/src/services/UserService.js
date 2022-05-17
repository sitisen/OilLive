import axios from 'axios';


const USERS_URL = 'http://localhost:9090/users';
const USERS_LOGIN = USERS_URL + '/login';           // 로그인
const USERS_IDCHECK = USERS_URL + '/idCheck';       // 아이디 중복확인
const USERS_PHONE =  USERS_URL + '/sendSMS';        // 휴대폰 인증
const USERS_PHONE_CHECK = USERS_URL + '/phoneCheck';   // 휴대폰 번호 중복확인
const USERS_SIGNUP = USERS_URL + '/signup';         // 회원가입
const USERS_FINDID_PHONE = USERS_URL + '/findIdPhone';   // 아이디 찾기 - 핸드폰
const USERS_FINDID_EMAIL = USERS_URL + '/findIdEmail';  // 아이디 찾기 - 이메일
const USERS_FIND_RESULT = USERS_URL + '/resultId';  // 아이디 반환
const USERS_PWD_UPDATE = USERS_URL + '/pwdUpdate'; // 비밀번호 변경
const USERS_SELECT_USER_INFO = USERS_URL + '/selectUserInfo'; // 사용자 정보 조회
const USERS_SELECT_CARD_INFO = USERS_URL + '/selectCardInfo'; // 사용자 카드 정보 조회

/* 사용자 Service */
const UserService = {

    /* 로그인 */
    login(inputs){
        return axios.post(USERS_LOGIN, inputs);
    },
    
    /* 아이디 중복확인 */
    idCheck(userId){
        return axios.get(USERS_IDCHECK+'/'+userId);
    },

    /* 휴대전화 본인인증 */
    sendSMS(phoneNum){
        return axios.get(USERS_PHONE+'/'+phoneNum);
    },

    /* 휴대전화 중복 */
    phoneCheck(phoneNum){
        return axios.get(USERS_PHONE_CHECK+'/'+phoneNum);
    },

    /* 회원가입 */
    signup(userId, userPwd, userName, userPhone, userGender, userBirth, userAddress, userEmail){
        return axios.post(USERS_SIGNUP,{
            userId : userId,
            userPwd : userPwd,
            userName : userName,
            userPhone : userPhone,
            userGender : userGender,
            userBirth : userBirth,
            userAddress : userAddress,
            userEmail :userEmail
        });
    },

    /* 아이디/비밀번호 찾기 - 휴대전화 인증 */
    findIdPhone(username, userphone){
        return axios.post(USERS_FINDID_PHONE,{
            username : username,
            userphone : userphone
        });
    },

    /* 아이디/비밀번호 찾기 - 이메일 인증 */
    findIdEmail(username, useremail){
        return axios.post(USERS_FINDID_EMAIL,{
            username : username,
            useremail : useremail
        });
    },
    
    /* 아이디 결과값 - 핸드폰 */
    resultPhone(username, userphone){
        return axios.post(USERS_FIND_RESULT,{
            username : username,
            userphone : userphone
        });
    },

     /* 아이디 결과값 - 이메일 */
    resultEmail(username, useremail){
        return axios.post(USERS_FIND_RESULT,{
            username : username,
            useremail : useremail
        });
    },

    /* 비밀번호 변경 */
    pwdUpdate(userid, userpwd){
        return axios.post(USERS_PWD_UPDATE,{
            userid : userid,
            userpwd : userpwd
        })
    },

    /* 사용자 정보 조회 */
    selectUserInfo(userId) {
        return axios.post(USERS_SELECT_USER_INFO, {
            userId : userId
        })
    },

    /* 사용자 카드 정보 조회 */
    selectCardInfo(userCode) {
        return axios.post(USERS_SELECT_CARD_INFO, {
            userCode : userCode
        })
    }


}

export default UserService;