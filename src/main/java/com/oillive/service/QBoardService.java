package com.oillive.service;

import java.util.List;

import com.oillive.vo.QBoardVO;

public interface QBoardService {

	//--------------- 문의 작성하기 --------------- //
	public int qBoardWrite(QBoardVO vo);

	//--------------- 사용자 문의목록 --------------- //
	public List<QBoardVO> getQBoardList(int userCode);

}
