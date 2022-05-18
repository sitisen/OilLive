import axios from 'axios';


const GOODS_URL = 'http://localhost:9090/goods';
const GOODS_SELECT_GOODS = GOODS_URL + '/selectGoods';  // 특정 상품 조회
const GOODS_SELECT_GOODS_KIND = GOODS_URL + '/selectGoodsKind';  // 상품 종류 탭 조회
const GOODS_SELECT_GOODS_LIST = GOODS_URL + '/selectGoodsList';  // 상품 목록 조회

/* 차량용품 Service */
const GoodsService = {

    /* 특정 상품 조회 */
    selectGoods (goodsCode, basketCode, userCode) {
        return axios.post(GOODS_SELECT_GOODS, {
            goodsCode: goodsCode,
            basketCode: basketCode,
            userCode: userCode
        })
    },

    /* 상품 분류 탭 조회 */
    selectGoodsKind () {
        return axios({
            method: 'get',
            url: GOODS_SELECT_GOODS_KIND
        });
    },
  
    /* 상품 목록 조회 */
    selectGoodsList (goodsName, selectedKind, currentPage) {
        return axios({
            method: 'get',
            url: GOODS_SELECT_GOODS_LIST,
            params: { 
                        title: goodsName,
                        kind: selectedKind,
                        page: currentPage 
                    }
        });
    }
    
}

export default GoodsService;