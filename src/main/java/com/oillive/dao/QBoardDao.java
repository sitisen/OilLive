package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.PhotoVO;
import com.oillive.vo.QBoardVO;
import com.oillive.vo.QnaVO;

@Mapper
public interface QBoardDao {

	//--------------- 문의 작성하기 --------------- //
	public int qBoardWrite(QBoardVO vo);

	//--------------- 사용자 문의목록 --------------- //
	public List<QBoardVO> getQBoardList(int userCode);

	//--------------- 사용자 문의삭제 --------------- //
	public int deleteQBoard(String qboardCode);

	//--------------- 문의글 전체개수 --------------- //
	public int qboardAllCount();
	
	//--------------- 문의글 답변완료 개수 --------------- //
	public int qboardFinishCount();

	//--------------- 문의글 목록 페이징 개수 --------------- //
	public int selectQboradCount(HashMap<String, String> param);

	//--------------- 문의글 목록 페이징 --------------- //
	public List<QnaVO> selectQboardList(HashMap<String, String> param);

	//--------------- 문의글 삭제 --------------- //
	public int qboardRemove(String qboardCode);

	//--------------- 문의글 첨부파일 --------------- //
	public PhotoVO getAttached(String qboardCode);

	//--------------- 문의글 답변 업데이트 --------------- //
	public int updateAnswer(HashMap<String, Object> map);
}
