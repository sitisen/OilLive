package com.oillive.service;

import java.util.HashMap;
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

	//--------------- qna 전체 개수 --------------- //
	public int qnaCount();

	//--------------- qna 삭제 --------------- //
	public int qnaDelete(int qnaCode);

	//--------------- qna 수정 상세페이지 --------------- //
	public QnaVO qnaDetail(int qnaCode);

	//--------------- qna 수정하기 --------------- //
	public int qnaModify(HashMap<String, Object> map);

	//--------------- qna 작성 --------------- //
	public int qnaWrite(HashMap<String, Object> map);

}
