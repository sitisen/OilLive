package com.oillive.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.QBoardVO;

@Mapper
public interface QBoardDao {

	//--------------- 문의 작성하기 --------------- //
	public int qBoardWrite(QBoardVO vo);

	//--------------- 사용자 문의목록 --------------- //
	public List<QBoardVO> getQBoardList(int userCode);

	//--------------- 사용자 문의삭제 --------------- //
	public int deleteQBoard(String qboardCode);

}
