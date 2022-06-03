package com.oillive.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.PaginationService;
import com.oillive.service.QnAService;
import com.oillive.vo.PaginationVO;
import com.oillive.vo.QnaVO;

@RestController
@RequestMapping("/qna")
@CrossOrigin(origins = "http://localhost:3000")
public class QnAController {
	
	@Autowired
	QnAService qnaService;

	@Autowired
	PaginationService paginationService;
	
	//--------------- Qna목록 --------------- //
	@GetMapping("/qnaList")
	public List<QnaVO> qnaList() {
		
		List<QnaVO> list = new ArrayList<QnaVO>();

		list = qnaService.qnaList();
		
		return list;
	}
	
	//--------------- Qna목록 페이징 --------------- //
	@GetMapping("/qnaListPage")
	public HashMap<String, Object> selectEventList( @RequestParam( name = "qnaName" ) String qnaName,
			@RequestParam( name = "page" ) int currentPage ) {
		
		// Pagination 처리 변수
		int totalCount = qnaService.selectQnaCount(qnaName); // Qna 테이블 데이터 개수
		int pageLimit = 5;  // 페이징바의 최대 노출 번호
		int listRange = 5; // 한 페이지당 노출시킬 데이터의 개수
		
		// 페이징 처리 객체
		PaginationVO paging = paginationService.pagination(totalCount, pageLimit, listRange, currentPage);
		
		// qna 목록이 담기는 리스트
		List<QnaVO> qnaList = qnaService.selectQnaList(qnaName, paging);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("paging", paging);
		result.put("qnaList", qnaList);
		
		return result;
	}
	
	//--------------- Qna 전체 개수 --------------- //
	@GetMapping("/qnaCount")
	public int qnaCount() {
		return qnaService.qnaCount();
	}
	
	//--------------- Qna 삭제 --------------- //
	@GetMapping("/qnaDelete")
	public int qnaDelete(@RequestParam( name = "qnaCode" ) int qnaCode) {
		return qnaService.qnaDelete(qnaCode);
	}
	
	//--------------- Qna 수정 상세페이지 --------------- //
	@GetMapping("/qnaDetail")
	public QnaVO qnaDetail(@RequestParam( name = "qnaCode" ) int qnaCode) {
		return qnaService.qnaDetail(qnaCode);
	}
	
	//--------------- Qna 수정하기 --------------- //
	@GetMapping("/qnaModify")
	public int qnaModify(@RequestParam( name = "qnaCode" ) int qnaCode,
			@RequestParam( name = "qnaTitle" ) String qnaTitle,
			@RequestParam( name = "qnaContent" ) String qnaContent
			) {
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("qnaCode", qnaCode);
		map.put("qnaTitle", qnaTitle);
		map.put("qnaContent", qnaContent);
		
		return qnaService.qnaModify(map);
	}
	
	//--------------- Qna 수정 상세페이지 --------------- //
	@GetMapping("/qnaWrite")
	public int qnaWrite(@RequestParam( name = "qnaTitle" ) String qnaTitle,
					@RequestParam( name = "qnaContent" ) String qnaContent) {
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("qnaTitle", qnaTitle);
		map.put("qnaContent", qnaContent);
		
		return qnaService.qnaWrite(map);
	}
}
