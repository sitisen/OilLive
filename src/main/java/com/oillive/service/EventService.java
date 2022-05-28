package com.oillive.service;

import java.util.List;

import com.oillive.vo.EventVO;
import com.oillive.vo.PaginationVO;

public interface EventService {

	//--------------- 이벤트 개수 조회 (페이징) --------------- //
	public int selectEventCount();
	
	//--------------- 이벤트 목록 조회 --------------- //
	public List<EventVO> selectEventList(PaginationVO paging);
	
}
