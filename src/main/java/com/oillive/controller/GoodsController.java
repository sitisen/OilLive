package com.oillive.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.GoodsService;
import com.oillive.vo.GoodsVO;
import com.oillive.vo.PaginationVO;

@RestController
@RequestMapping("/goods")
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {
	
	@Autowired
	GoodsService goodsService;
	
	//--------------- 상품 종류 탭 조회 --------------- //
	@GetMapping("/selectGoodsKind")
	public List<String> selectGoodsKind() {
		
		List<String> goodsKind = goodsService.selectGoodsKind();

		goodsKind.add(0, "전체");
		
		return goodsKind;
	}
  	
	//--------------- 상품 목록 조회 --------------- //
	@GetMapping("/selectGoodsList")
	public List<GoodsVO> selectGoodsList( @RequestParam( name = "kind" ) String selectedKind,
								@RequestParam( name = "page" ) int currentPage) {
		
		// Pagination 처리 변수
		int totalCount = goodsService.selectGoodsCount(); // 현재 GOODS 테이블에 존재하는 상품 개수
		
		int pageLimit = 5; // 페이징 바에 보여줄 최대 개수 EX) 5 : 1 ~ 5 까지 출력 / 6 ~ 10까지 출력

		int listRange = 15; // 한 페이지당 노출할 상품 개수

		int maxPage = (int)Math.ceil( (double)totalCount / listRange ); // 총 페이지의 개수

		int startPage = ( currentPage - 1 ) / pageLimit * pageLimit + 1; // 페이징 바의 시작 수 EX) 1 ~ 5 일때, 1부터 시작

		int endPage = startPage + pageLimit - 1; // 페이징 바의 마지막 수 EX) 1 ~ 5 일때, 5 / 1 ~ 4 일때, 4

		if( endPage > maxPage ) { // 페이징바의 마지막 수가 최대 페이지를 넘었을 경우,
			endPage = maxPage;
		}
		// Pagination 처리
		PaginationVO paging = PaginationVO.builder()
							  .totalCount(totalCount)
							  .currentPage(currentPage)
							  .pageLimit(pageLimit)
							  .listRange(listRange)
							  .maxPage(maxPage)
							  .startPage(startPage)
							  .endPage(endPage)
							  .build();
		
		List<GoodsVO> goodsList = goodsService.selectGoodsList(selectedKind, paging);	
		
		return goodsList;
	}
}
