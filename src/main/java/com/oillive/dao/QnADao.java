package com.oillive.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.QnaVO;

@Mapper
public interface QnADao {

	//--------------- qna 목록 --------------- //
	public List<QnaVO> qnaList();

}
