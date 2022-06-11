import axios from 'axios';


const API_URL = process.env.REACT_APP_URL + '/users';

const OIL_PRICE_LIST_URL = API_URL + '/home';
const ELECTRIC_CAR = API_URL + '/electriccar';  // 전기차 충전소

/* 유가 API */
const ApiService = {

    oilPriceList (oilType) {
        return axios({
            method: 'get',
            url: OIL_PRICE_LIST_URL,
            params: oilType
        });
    },

    electriccar(code){
        return axios({
            method: 'get',
            url: ELECTRIC_CAR,
            params: {
                code : code
            }
        });
    }

}

export default ApiService;