package com.oillive.service;

import java.util.List;

import com.oillive.vo.GoodsVO;
import com.oillive.vo.PaginationVO;

public interface GoodsService {
	
	//--------------- 상품 종류 탭 조회 --------------- //	
	public List<String> selectGoodsKind();
	
	//--------------- 상품 목록 개수 조회 (페이징) --------------- //
	public int selectGoodsCount();
	
	//--------------- 상품 목록 조회 --------------- //
	public List<GoodsVO> selectGoodsList(String selectedKind, PaginationVO paging);
	
}
