import axios from 'axios';


const Q_BOARD_URL = 'http://localhost:9090/qBoard';
const Q_BOARD_WRITE = Q_BOARD_URL + '/qBoardWrite';             // 문의글 작성
const Q_BOARD_IMG_UPLOAD = Q_BOARD_URL + '/qBoardImgUpload';    // 문의 이미지 업로드
const Q_BOARD_LIST = Q_BOARD_URL + '/qBoardList';          // 사용자 문의글 목록

/* 문의 Service */
const QBoardService = {

    qBoardWrite(userId, title, content){
        return axios({
            method: 'get',
            url: Q_BOARD_WRITE,
            params: { 
                userId: userId,
                title: title,
                content: content
            }
        });
    },

    qBoardImgUpload(file){
        return axios.post(Q_BOARD_IMG_UPLOAD,file);
    },

    qBoardList(userId){
        return axios({
            method: 'get',
            url: Q_BOARD_LIST,
            params: { 
                userId: userId
            }
        });
    }
}

export default QBoardService;