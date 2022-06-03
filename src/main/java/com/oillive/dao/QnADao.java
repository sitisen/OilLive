package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.QnaVO;

@Mapper
public interface QnADao {

	//--------------- qna 목록 --------------- //
	public List<QnaVO> qnaList();

	//--------------- qna 페이징 개수 --------------- //
	public int selectQnaCount(HashMap<String, String> param);

	//--------------- qna 목록 --------------- //
	public List<QnaVO> selectQnaList(HashMap<String, String> param);

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
