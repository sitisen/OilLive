package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.BasketVO;
import com.oillive.vo.GoodsVO;

@Mapper
public interface GoodsDao {

	//--------------- 특정 상품 조회 --------------- //
	public List<GoodsVO> selectGoods(String goodsCode);
	
	//--------------- 특정 장바구니 조회 --------------- //
	public List<BasketVO> selectBasket(HashMap<String, Object> params);
	
	//--------------- 상품 종류 탭 조회 --------------- //
	public List<String> selectGoodsKind();
	
	//--------------- 상품 목록 개수 조회 (페이징) --------------- //
	public int selectGoodsCount(HashMap<String, String> param);
	
	//--------------- 상품 목록 조회 --------------- //
	public List<GoodsVO> selectGoodsList(HashMap<String, String> param);
	
	//--------------- 상품 수량 갱신 --------------- //
	public int updateGoodsAmount(HashMap<String, String> param);
	
}
