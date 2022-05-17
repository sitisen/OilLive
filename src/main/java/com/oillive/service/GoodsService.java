package com.oillive.service;

import java.util.List;

import com.oillive.vo.BasketVO;
import com.oillive.vo.GoodsVO;
import com.oillive.vo.PaginationVO;

public interface GoodsService {
	
	//--------------- 특정 상품 조회 --------------- //
	public List<GoodsVO> selectGoods(String goodsCode);
	
	//--------------- 특정 장바구니 조회 --------------- //
	public List<BasketVO> selectBasket(List<BasketVO> basketCode);
	
	//--------------- 상품 종류 탭 조회 --------------- //	
	public List<String> selectGoodsKind();
	
	//--------------- 상품 목록 개수 조회 (페이징) --------------- //
	public int selectGoodsCount(String goodsName, String selectedKind);
	
	//--------------- 상품 목록 조회 --------------- //
	public List<GoodsVO> selectGoodsList(String goodsName, String selectedKind, PaginationVO paging);
	
}
