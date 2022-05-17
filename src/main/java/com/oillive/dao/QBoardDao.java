package com.oillive.dao;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.QBoardVO;

@Mapper
public interface QBoardDao {

	//--------------- 문의 작성하기 --------------- //
	public int qBoardWrite(QBoardVO vo);

}
