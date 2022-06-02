package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.QnaVO;

@Mapper
public interface QnADao {

	//--------------- qna 목록 --------------- //
	public List<QnaVO> qnaList();

	//--------------- qna 전체수 --------------- //
	public int selectQnaCount(HashMap<String, String> param);

	//--------------- qna 목록 --------------- //
	public List<QnaVO> selectQnaList(HashMap<String, String> param);
}
