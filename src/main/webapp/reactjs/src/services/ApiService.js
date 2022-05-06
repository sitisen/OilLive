import axios from 'axios';


const API_URL = "http://localhost:9090/users";

const OIL_PRICE_LIST_URL = API_URL + "/home";

/* 유가 API */
const ApiService = {

    oilPriceList (oilType) {
        return axios({
            method: 'get',
            url: OIL_PRICE_LIST_URL,
            params: oilType
        });
    }

}

export default ApiService;