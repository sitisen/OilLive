package com.oillive.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.QBoardDao;
import com.oillive.vo.QBoardVO;

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
	
}
