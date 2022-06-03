import axios from 'axios';

const QNA_URL = 'http://localhost:9090/qna';
const QNA_LIST = QNA_URL + '/qnaList';  // qna 목록 조회
const QNA_LIST_PAGE = QNA_URL + '/qnaListPage';  // qna 목록 조회 (페이징)
const QNA_COUNT = QNA_URL + '/qnaCount';  // qna 총 개수
const QNA_DELETE = QNA_URL + '/qnaDelete';  // qna 삭제
const QNA_DETAIL = QNA_URL + '/qnaDetail';  // qna 수정 버튼 클릭시 상세페이지
const QNA_MODIFY = QNA_URL + '/qnaModify';  // qna 수정
const QNA_WRITE = QNA_URL + '/qnaWrite';  // qna 작성

/* 이벤트 Service */
const QnAService = {
    
    qnaList(){
        return axios.get(QNA_LIST);
    },

    qnaListPage(qnaName, currentPage){
        return axios.get(QNA_LIST_PAGE,{
            params: { 
                qnaName: qnaName,
                page: currentPage
                    }
        });
    },

    qnaCount(){
        return axios.get(QNA_COUNT);
    },

    qnaDelete(qnaCode){
        return axios.get(QNA_DELETE, {
            params: {
                qnaCode : qnaCode
            }
        })
    },

    qnaDetail(qnaCode){
        return axios.get(QNA_DETAIL, {
            params: {
                qnaCode : qnaCode
            }
        });
    },

    qnaModify(qnaCode, qnaTitle, qnaContent){
        return axios.get(QNA_MODIFY, {
            params: {
                qnaCode : qnaCode,
                qnaTitle : qnaTitle,
                qnaContent : qnaContent
            }
        })
    },

    qnaWrite(qnaTitle, qnaContent){
        return axios.get(QNA_WRITE, {
            params: {
                qnaTitle : qnaTitle,
                qnaContent : qnaContent
            }
        })
    }
}

export default QnAService;