package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.GoodsVO;

@Mapper
public interface GoodsDao {

	//--------------- 상품 종류 탭 조회 --------------- //
	public List<String> selectGoodsKind();
	
	//--------------- 상품 목록 개수 조회 (페이징) --------------- //
	public int selectGoodsCount(HashMap<String, String> param);
	
	//--------------- 상품 목록 조회 --------------- //
	public List<GoodsVO> selectGoodsList(HashMap<String, String> param);
	
}
