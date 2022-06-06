import axios from 'axios';


const Q_BOARD_URL = 'http://localhost:9090/qBoard';
const Q_BOARD_WRITE = Q_BOARD_URL + '/qBoardWrite';                     // 문의글 작성
const Q_BOARD_IMG_UPLOAD = Q_BOARD_URL + '/qBoardImgUpload';            // 문의 이미지 업로드
const Q_BOARD_LIST = Q_BOARD_URL + '/qBoardList';                       // 사용자 문의글 목록
const Q_BOARD_DELETE = Q_BOARD_URL + '/deleteQBoard';                   // 사용자 문의글 삭제
const Q_BOARD_COUNT = Q_BOARD_URL + '/qboardCount';                     // 관리자 문의글 개수
const Q_BOARD_LIST_PAGE = Q_BOARD_URL + '/qboardListPage';              // 관리자 문의 페이징
const Q_BOARD_REMOVE =  Q_BOARD_URL + '/qboardRemove';                  // 관리자 문의글 삭제
const Q_BOARD_GET_ATTACHED =  Q_BOARD_URL + '/getAttached';             // 관리자 문의글 첨부파일 가져오기

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
    },
    
    deleteQBoard(qboardCode){
        return axios({
            method: 'get',
            url: Q_BOARD_DELETE,
            params: {
                qboardCode: qboardCode.join(',')
            }
        });
    },

    qboardCount(){
        return axios.get(Q_BOARD_COUNT);
    },

    qboardListPage(userId, currentPage){
        return axios.get(Q_BOARD_LIST_PAGE ,{
            params: { 
                userId: userId,
                page: currentPage
                    }
        })
    },

    qboardRemove(qboardCode, photoCode, photoPath, photoReName){
        return axios.get(Q_BOARD_REMOVE, {
            params: {
                qboardCode : qboardCode,
                photoCode : photoCode,
                photoPath : photoPath,
                photoReName : photoReName
            }
        })
    },

    getAttached(qboardCode){
        return axios.get(Q_BOARD_GET_ATTACHED, {
            params: {
                qboardCode : qboardCode
            }
        })
    }
}

export default QBoardService;