import axios from 'axios';

const QNA_URL = 'http://localhost:9090/qna';
const QNA_LIST = QNA_URL + '/qnaList';  // qna 목록 조회

/* 이벤트 Service */
const QnAService = {
    
    qnaList(){
        return axios.get(QNA_LIST);
    }
}

export default QnAService;