package com.oillive.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.GoodsService;
import com.oillive.service.PaginationService;
import com.oillive.vo.GoodsVO;
import com.oillive.vo.PaginationVO;

@RestController
@RequestMapping("/goods")
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {
	
	@Autowired
	GoodsService goodsService;
	
	@Autowired
	PaginationService paginationService;
	
	//--------------- 상품 종류 탭 조회 --------------- //
	@GetMapping("/selectGoodsKind")
	public List<String> selectGoodsKind() {
		
		List<String> goodsKind = goodsService.selectGoodsKind();

		goodsKind.add(0, "전체");
		
		return goodsKind;
	}
  	
	//--------------- 상품 목록 조회 --------------- //
	@GetMapping("/selectGoodsList")
	public HashMap<String, Object> selectGoodsList( @RequestParam( name = "title" ) String goodsName,
													@RequestParam( name = "kind" ) String selectedKind,
										  			@RequestParam( name = "page" ) int currentPage) {
		
		// Pagination 처리 변수
		int totalCount = goodsService.selectGoodsCount(goodsName, selectedKind); // GOODS 테이블 데이터 개수
		int pageLimit = 5;  // 페이징바의 최대 노출 번호
		int listRange = 15; // 한 페이지당 노출시킬 데이터의 개수

		PaginationVO paging = paginationService.pagination(totalCount, pageLimit, listRange, currentPage);
		
		List<GoodsVO> goodsList = goodsService.selectGoodsList(goodsName, selectedKind, paging);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("paging", paging);
		result.put("goodsList", goodsList);
		
		return result;
	}
}
