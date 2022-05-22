package com.oillive.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.GoodsService;
import com.oillive.service.PaginationService;
import com.oillive.vo.BasketVO;
import com.oillive.vo.GoodsVO;
import com.oillive.vo.OrdersVO;
import com.oillive.vo.PaginationVO;

@RestController
@RequestMapping("/goods")
@CrossOrigin(origins = "http://localhost:3000")
public class GoodsController {
	
	@Autowired
	GoodsService goodsService;
	
	@Autowired
	PaginationService paginationService;
	
	//--------------- 특정 상품 조회 --------------- //
	@PostMapping("/selectGoods")
	public HashMap<String, Object> selectGoods(@RequestBody HashMap<String, String> req) {
		
		// 비즈니스 로직 결과값을 저장할 컬렉션 선언
		List<GoodsVO> goods = new ArrayList<GoodsVO>();
		List<BasketVO> basket = new ArrayList<BasketVO>();
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		String goodsCode = req.get("goodsCode");	// 상품 코드
		String basketCheck = req.get("basketCode");	// 장바구니로 구매하는건지 체크
		String userCode = "1";//req.get("userCode");		// 회원 코드
		
		
		if( basketCheck == null ) { // 바로 구매일 경우,
			
			 goods = goodsService.selectGoods(goodsCode);
			 
			 result.put("goods", goods);
			
		} else { // 장바구니에 있는 상품 구매일 경우, 
			
			List<String> basketCode = new ArrayList<String>();
			
			for(String s : basketCheck.split(",")) { // String 으로 넘어온 장바구니 코드를 배열로 변환하여, List에 추가
				basketCode.add(s);
			}
			
			basket = goodsService.selectBasket(basketCode, userCode);	
			
			result.put("goods", basket); // 장바구니에 담긴 상품을 출력해야하기 때문에 Key값 goods로 설정
		}
		
		return result;
		
	}
	
	
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
	
	//--------------- 상품 수량 갱신 --------------- //
	@PatchMapping("/updateGoodsAmount")
	public int updateGoodsAmount(@RequestBody HashMap<String, List<OrdersVO>> req) {

		// 사용자가 선택한 상품 코드, 구매 수량이 담긴 List
		List<OrdersVO> selectedGoods = new ArrayList<OrdersVO>(req.get("selectedGoods"));

		int result = goodsService.updateGoodsAmount(selectedGoods);
		
		return result;
	}
}
