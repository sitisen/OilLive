package com.oillive.service;

import java.util.List;

import com.oillive.vo.EventVO;
import com.oillive.vo.PaginationVO;

public interface EventService {

	//--------------- 이벤트 개수 조회 (페이징) --------------- //
	public int selectEventCount(String eventName, String filterName);
	
	//--------------- 이벤트 목록 조회 --------------- //
	public List<EventVO> selectEventList(String eventName, String filterName, PaginationVO paging);
	
	//--------------- 메인페이지 이벤트 조회 --------------- //
	public List<EventVO> selectEventBanner();
	
}
