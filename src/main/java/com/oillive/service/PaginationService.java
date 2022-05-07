package com.oillive.service;

import com.oillive.vo.PaginationVO;

public interface PaginationService {

	//--------------- 페이징 처리 --------------- //
	public PaginationVO pagination(int totalCount, 
								   int pageLimit, 
								   int listRange, 
								   int currentPage);
	
}
