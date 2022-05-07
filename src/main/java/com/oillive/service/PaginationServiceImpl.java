package com.oillive.service;

import org.springframework.stereotype.Service;

import com.oillive.vo.PaginationVO;

@Service
public class PaginationServiceImpl implements PaginationService {

	//--------------- 페이징 처리 --------------- //
	/**
	 * totalCount 	:: Pagination 시킬 데이터의 총 개수
	 * pageLimit	:: 페이징바의 최대 노출 번호 / EX) 5 : 페이징바 1 ~ 5 까지 번호 출력 
	 * listRange 	:: 한 페이지당 노출시킬 데이터의 개수
	 * currentPage	:: 현재 페이지 번호
	 */
	@Override
	public PaginationVO pagination(int totalCount, 
								   int pageLimit, 
								   int listRange, 
								   int currentPage) {
		
		// Pagination 처리 변수
		int maxPage = (int)Math.ceil( (double)totalCount / listRange ); // 총 페이지의 개수

		int startPage = ( currentPage - 1 ) / pageLimit * pageLimit + 1; // 페이징 바의 시작 수 EX) 1 ~ 5 일때, 1부터 시작

		int endPage = startPage + pageLimit - 1; // 페이징 바의 마지막 수 EX) 1 ~ 5 일때, 5 / 1 ~ 4 일때, 4

		if( endPage > maxPage ) { // 페이징바의 마지막 수가 최대 페이지를 넘었을 경우,
			endPage = maxPage;
		}
		
		// Pagination 결과 객체에 담기
		PaginationVO paging = PaginationVO.builder()
							  .totalCount(totalCount)
							  .currentPage(currentPage)
							  .pageLimit(pageLimit)
							  .listRange(listRange)
							  .maxPage(maxPage)
							  .startPage(startPage)
							  .endPage(endPage)
							  .build();
		
		return paging;
	}

	
	
}
