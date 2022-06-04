package com.oillive.service;

import java.util.HashMap;
import java.util.List;

import com.oillive.vo.PaginationVO;
import com.oillive.vo.PhotoVO;
import com.oillive.vo.QBoardVO;
import com.oillive.vo.QnaVO;

public interface QBoardService {

	//--------------- 문의 작성하기 --------------- //
	public int qBoardWrite(QBoardVO vo);

	//--------------- 사용자 문의목록 --------------- //
	public List<QBoardVO> getQBoardList(int userCode);

	//--------------- 사용자 문의삭제 --------------- //
	public int deleteQBoard(List<String> qboardCode);

	//--------------- 관리자 문의글 개수 --------------- //
	public HashMap<String,Integer> qboardCount();

	//--------------- 관리자 문의글 페이징 개수 --------------- //
	public int selectQboardCount(String userId);

	//--------------- 관리자 문의글 페이징 --------------- //
	public List<QnaVO> selectQboardList(String userId, PaginationVO paging);
	
	//--------------- 관리자 문의글 삭제 --------------- //
	public int qboardRemove(String qboardCode);

	//--------------- 관리자 문의글 첨부파일 가져오기 --------------- //
	public PhotoVO getAttached(String qboardCode);
}
