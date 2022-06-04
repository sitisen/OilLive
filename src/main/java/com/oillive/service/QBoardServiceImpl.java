package com.oillive.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.QBoardDao;
import com.oillive.vo.PaginationVO;
import com.oillive.vo.PhotoVO;
import com.oillive.vo.QBoardVO;
import com.oillive.vo.QnaVO;

@Service
public class QBoardServiceImpl implements QBoardService {

	@Autowired
	QBoardDao qBoardDao;

	//--------------- 문의 작성하기 --------------- //
	@Override
	public int qBoardWrite(QBoardVO vo) {
		return qBoardDao.qBoardWrite(vo);
	}

	//--------------- 사용자 문의목록 --------------- //
	@Override
	public List<QBoardVO> getQBoardList(int userCode) {
		return qBoardDao.getQBoardList(userCode);
	}

	//--------------- 사용자 문의삭제 --------------- //
	@Override
	public int deleteQBoard(List<String> qboardCode) {
		int result = 0;
		for(int i = 0; i < qboardCode.size(); i++) {
			result = qBoardDao.deleteQBoard(qboardCode.get(i));
		}
		return result;
	}

	//--------------- 관리자 문의글 개수 --------------- //
	@Override
	public HashMap<String, Integer> qboardCount() {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		
		// 전체 문의글 개수
		map.put("allCount", qBoardDao.qboardAllCount());
		// 답변완료 문의글 개수
		map.put("finishCount", qBoardDao.qboardFinishCount());
		return map;
	}

	//--------------- 관리자 문의글 페이징 개수 --------------- //
	@Override
	public int selectQboardCount(String userId) {
		HashMap<String, String> param = new HashMap<String, String>();

		param.put("userId", userId);
		
		return qBoardDao.selectQboradCount(param);
	}

	//--------------- 관리자 문의글 페이징 --------------- //
	@Override
	public List<QnaVO> selectQboardList(String userId, PaginationVO paging) {
		// 한 페이지 당 8개의 상품 정보를 보여주기 위해 WHERE 절에 쓰일 변수
		int startRow = (paging.getCurrentPage() - 1) * paging.getListRange() + 1;
		int endRow = startRow + paging.getListRange() - 1;
		
		// Mapper 에 여러 개의 변수를 전달해야 하기 때문에 Map 으로 가공
		HashMap<String, String> param = new HashMap<String, String>();

		param.put("userId", userId);
		param.put("startRow", String.valueOf(startRow));
		param.put("endRow", String.valueOf(endRow));	
		
		return qBoardDao.selectQboardList(param);
	}

	//--------------- 관리자 문의글 삭제 --------------- //
	@Override
	public int qboardRemove(String qboardCode) {
		return qBoardDao.qboardRemove(qboardCode);
	}

	//--------------- 관리자 문의글 첨부파일 가져오기 --------------- //
	@Override
	public PhotoVO getAttached(String qboardCode) {
		return qBoardDao.getAttached(qboardCode);
	}
	
}
