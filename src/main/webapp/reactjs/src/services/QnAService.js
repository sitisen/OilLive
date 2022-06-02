import axios from 'axios';

const QNA_URL = 'http://localhost:9090/qna';
const QNA_LIST = QNA_URL + '/qnaList';  // qna 목록 조회
const QNA_LIST_PAGE = QNA_URL + '/qnaListPage';  // qna 목록 조회 (페이징)

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
    }
}

export default QnAService;