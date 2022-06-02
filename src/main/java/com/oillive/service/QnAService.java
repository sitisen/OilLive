package com.oillive.service;

import java.util.List;

import com.oillive.vo.PaginationVO;
import com.oillive.vo.QnaVO;

public interface QnAService {

	//--------------- qna 목록 --------------- //
	public List<QnaVO> qnaList();

	//--------------- qna 전체 수 --------------- //
	public int selectQnaCount(String qnaName);

	//--------------- qna 목록조회 --------------- //
	public List<QnaVO> selectQnaList(String qnaName, PaginationVO paging);

}
