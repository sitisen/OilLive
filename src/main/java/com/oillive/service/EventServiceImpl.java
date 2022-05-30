package com.oillive.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.EventDao;
import com.oillive.vo.EventVO;
import com.oillive.vo.PaginationVO;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	EventDao eventDao;

	//--------------- 이벤트 개수 조회 (페이징) --------------- //
	@Override
	public int selectEventCount(String filterName) {
		// 현재 이벤트가 진행 중인지, 종료한 것인지 판별하기 위한 날짜 변수
		Date today = new Date();
		SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy/MM/dd");
		
		// Mapper 에 여러 개의 변수를 전달해야 하기 때문에 Map 으로 가공
		HashMap<String, String> param = new HashMap<String, String>();

		param.put("today", simpleFormat.format(today));
		param.put("filterName", filterName);		
		
		return eventDao.selectEventCount(param);
	}
	
	//--------------- 이벤트 목록 조회 --------------- //
	@Override
	public List<EventVO> selectEventList(String filterName, PaginationVO paging) {
		
		// 현재 이벤트가 진행 중인지, 종료한 것인지 판별하기 위한 날짜 변수
		Date today = new Date();
		SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy/MM/dd");
		
		// 한 페이지 당 8개의 상품 정보를 보여주기 위해 WHERE 절에 쓰일 변수
		int startRow = (paging.getCurrentPage() - 1) * paging.getListRange() + 1;
		int endRow = startRow + paging.getListRange() - 1;
		
		// Mapper 에 여러 개의 변수를 전달해야 하기 때문에 Map 으로 가공
		HashMap<String, String> param = new HashMap<String, String>();

		param.put("today", simpleFormat.format(today));
		param.put("filterName", filterName);
		param.put("startRow", String.valueOf(startRow));
		param.put("endRow", String.valueOf(endRow));	
		
		return eventDao.selectEventList(param);
	}
	
}
