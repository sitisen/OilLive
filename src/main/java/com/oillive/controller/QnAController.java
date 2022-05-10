package com.oillive.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.QnAService;
import com.oillive.vo.QnaVO;

@RestController
@RequestMapping("/qna")
@CrossOrigin(origins = "http://localhost:3000")
public class QnAController {
	
	@Autowired
	QnAService qnaService;

	//--------------- Qna목록 --------------- //
	@GetMapping("/qnaList")
	public List<QnaVO> qnaList() {
		
		List<QnaVO> list = new ArrayList<QnaVO>();

		list = qnaService.qnaList();
		
		return list;
	}
}
