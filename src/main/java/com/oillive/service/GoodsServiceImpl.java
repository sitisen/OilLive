package com.oillive.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.GoodsDao;
import com.oillive.vo.GoodsVO;
import com.oillive.vo.PaginationVO;

@Service
public class GoodsServiceImpl implements GoodsService {

	@Autowired
	GoodsDao goodsDao;
	
	//--------------- 상품 종류 탭 조회 --------------- //
	@Override
	public List<String> selectGoodsKind() {
		return goodsDao.selectGoodsKind();
	}

	//--------------- 상품 목록 개수 조회 (페이징) --------------- //
	@Override
	public int selectGoodsCount(String goodsName, String selectedKind) {
		
		// Mapper 에 여러 개의 변수를 전달해야 하기 때문에 Map 으로 가공
		HashMap<String, String> param = new HashMap<String, String>();
		
		param.put("goodsName", goodsName);
		param.put("selectedKind", selectedKind);
		
		return goodsDao.selectGoodsCount(param);
	}
	
	//--------------- 상품 목록 조회 --------------- //
	@Override
	public List<GoodsVO> selectGoodsList(String goodsName, String selectedKind, PaginationVO paging) {
		
		// 한 페이지 당 15개의 상품 정보를 보여주기 위해 WHERE 절에 쓰일 변수
		int startRow = (paging.getCurrentPage() - 1) * paging.getListRange() + 1;
		int endRow = startRow + paging.getListRange() - 1;
		
		// Mapper 에 여러 개의 변수를 전달해야 하기 때문에 Map 으로 가공
		HashMap<String, String> param = new HashMap<String, String>();
		
		param.put("goodsName", goodsName);
		param.put("selectedKind", selectedKind);
		param.put("startRow", String.valueOf(startRow));
		param.put("endRow", String.valueOf(endRow));	
		
		return goodsDao.selectGoodsList(param);
	}
	
}
