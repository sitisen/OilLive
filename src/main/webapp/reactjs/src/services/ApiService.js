import axios from 'axios';


const API_URL = "http://localhost:9090";

const OIL_PRICE_LIST_URL = API_URL + "/users/home";

/* 유가 API */
const ApiService = {

    oilPriceList (inputs) {
        return axios({
            method: 'get',
            url: OIL_PRICE_LIST_URL,
            params: inputs
        });
    }

}

export default ApiService;