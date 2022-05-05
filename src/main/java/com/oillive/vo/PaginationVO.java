package com.oillive.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaginationVO {
	
	private int totalCount;		// 테이블의 존재하는 개체의 개수
	private int currentPage;	// 현재 페이지 번호
	private int pageLimit;		// 페이징바의 최대 노출 숫자 ( 5 : 1 ~ 5 )
	private int listRange;		// 한 페이지당 노출할 개체의 개수
	private int maxPage;		// 총 페이지의 개수
	private int startPage;		// 페이징바의 시작 수
	private int endPage;		// 페이징바의 마지막 수
	
}
