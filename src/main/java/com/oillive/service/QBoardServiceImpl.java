package com.oillive.service;

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
	
}
