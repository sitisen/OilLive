package com.oillive.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.EventService;
import com.oillive.service.PaginationService;
import com.oillive.vo.EventVO;
import com.oillive.vo.PaginationVO;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

	@Autowired
	EventService eventService;
	
	@Autowired
	PaginationService paginationService;
	
	//--------------- 이벤트 목록 조회 --------------- //
	@GetMapping("/selectEventList")
	public HashMap<String, Object> selectEventList( @RequestParam( name = "title" ) String eventName,
													@RequestParam( name = "filterName" ) String filterName,
													@RequestParam( name = "page" ) int currentPage ) {
		
		// Pagination 처리 변수
		int totalCount = eventService.selectEventCount(eventName, filterName); // EVENT 테이블 데이터 개수
		int pageLimit = 5;  // 페이징바의 최대 노출 번호
		int listRange = 8; // 한 페이지당 노출시킬 데이터의 개수
		
		// 페이징 처리 객체
		PaginationVO paging = paginationService.pagination(totalCount, pageLimit, listRange, currentPage);
		
		// 이벤트 목록이 담기는 리스트
		List<EventVO> eventList = eventService.selectEventList(eventName, filterName, paging);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("paging", paging);
		result.put("eventList", eventList);
		
		return result;
	}
	
}
